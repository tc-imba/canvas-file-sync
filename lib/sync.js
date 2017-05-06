/**
 * Created by liu on 17-4-26.
 */
const fs = require('fs');
const path = require('path');
const async = require('neo-async');
const pify = require('pify');
const config = require('config');
const database = require('./database');
const download = require('download');
const datatime = require('silly-datetime');
const oauth = require('./oauth');
const qiniu = require('./qiniu');
const logger = require('./logger');
const _user = require('./user');

class Sync {
    log(level, str, course_id = '') {
        let time = datatime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        if (course_id) {
            logger.log(level, `[${time}] course(${course_id}) ${str}`);
        } else {
            logger.log(level, `[${time}] ${str}`);
        }
    }

    async beginListen() {
        this.log('info', `Listening to the sync queue ...`);
    }

    async init() {
        this.beginListen();
    }

    async getFirstOfQueue() {
        let course_id = -1;
        await database.select('*').from('queue').orderBy('timestamp', 'asc').limit(1).then(rows => {
            if (rows.length > 0) {
                course_id = rows[0].course_id;
            }
        }).catch();
        if (course_id >= 0) {
            this.log('info', `Taking course(${course_id}) out of the queue`);
        } else {
            //this.log('info', `No course found in queue, waiting for 10 seconds to try again`);
        }
        return course_id;
    }

    async removeCourseInQueue(course_id) {
        await database('queue').where({course_id: course_id}).delete().then().catch();
    }

    async addCourseToQueue(course_id) {
        let result = {};
        await database.select('*').from('queue').where('course_id', course_id).then(rows => {
            if (rows.length > 0) {
                result.state = 0; // In the queue
            } else {
                return database('queue').insert({course_id: course_id});
            }
        }).then(data => {
            result.state = 0; // In the queue
        }).catch(error => {
            result.error = error;
        });
        return result;
    }

    async refreshCourseInQueue(course_id) {
        await database('queue').where({course_id: course_id}).update({timestamp: database.fn.now()}).then().catch();
    }

    async getData(user, course_id) {
        const log = (level, str) => this.log(level, str, course_id);

        const getWithApi = async (item) => {
            log('info', `Trying to list the ${item} with user(${user.id})`);
            let page = 1;
            let first_error = true;
            let result = [];
            let info = item.substring(0, item.length - 1) + '(s)';
            while (true) {
                try {
                    let page_result = await oauth.get(['api', 'v1', 'courses', course_id, item + '?page=' + page], user.access_token);
                    if (page_result.length === 0) {
                        break;
                    } else {
                        result = result.concat(page_result);
                        log('info', `Got ${page_result.length} ${info} on page ${page++}`);
                    }
                    first_error = true;
                } catch (error) {
                    if (first_error) {
                        log('info', `Failed on page ${page}, trying again`);
                        first_error = false;
                    } else {
                        throw error;
                    }
                }
            }
            return result;
        };
        let result = {};
        try {
            result.files = await getWithApi('files');
            result.folders = await getWithApi('folders');
        } catch (error) {
            result.error = error;
        }
        return result;
    }

    async syncCourse(course_id) {

        const log = (level, str) => this.log(level, str, course_id);

        log('info', '---------- Sync begins ---------- ');

        let files = [];
        let folders = [];
        let refresh = false;
        let refresh_first = true;

        while (true) {
            // Get the first user token available for the course
            let user = null;
            let error;
            try {
                await database.select('user.id', 'user.access_token', 'user.refresh_token')
                    .from('user_course').where('course_id', course_id)
                    .join('user', 'user_course.user_id', 'user.id').limit(1)
                    .then(rows => {
                        if (rows.length > 0) user = rows[0];
                    })
                    .catch(e => {
                        error = e;
                    });
                if (error)throw error;
            } catch (error) {
                log('error', `Database error: ${error}`);
                continue;
            }
            if (!user) {
                log('warn', `Sync ended since no user token available for this course`);
                log('warn', '---------- Sync terminated ---------- ');
                return {
                    code: 403,
                    message: 'no user token available for this course'
                };
            }

            // Try the access token if exists
            if (user.access_token) {
                let data = await this.getData(user, course_id);
                if (data.error) {
                    refresh = true;
                    if (data.error.statusCode == 404) {
                        log('warn', `Sync ended since a 404 error when accessing ${data.error.url}`);
                        log('warn', '---------- Sync terminated ---------- ');
                        return {
                            code: 404,
                            message: `error when accessing ${data.error.url}`
                        };
                    } else {
                        log('warn', `User (${user.id}) failed to list the files, trying to refresh the token`);
                    }
                } else {
                    // Get data successfully, break the loop
                    files = data.files;
                    folders = data.folders;
                    break;
                }
            }
            else {
                log('warn', `user(${user.id}) token not found, trying to refresh the token`);
                refresh = true;
            }

            // Try to refresh the token
            if (refresh && user.refresh_token && refresh_first) {
                refresh_first = false;
                try {
                    await _user.refresh(user.id, user.refresh_token);
                    log('info', `user(${user.id}) Token refreshed successfully`);
                    continue;
                } catch (error) {
                    log('warn', `user(${user.id}) Token refresh error: ${error}`);
                }
            }

            // Delete the user course if failed again
            if (!refresh_first) {
                log('warn', `User (id: ${user.id}) failed again, remove this user`);
                try {
                    await database('user_course').where('user_id', user.id).delete().then().catch(e => {
                        error = e;
                    });
                    if (error)throw error;
                } catch (error) {
                    log('warn', `Database error: ${error}`);
                }
                refresh_first = true;
            }
        }

        log('info', `Success, ${files.length} files(s) and ${folders.length} folder(s) listed`);


        let files_map = {};
        let file_id_arr = [];
        for (let i = 0; i < files.length; i++) {
            files_map[files[i].id] = files[i];
            files_map[files[i].id].created = true;
            file_id_arr.push(files[i].id);
            files[i] = {
                id: files[i].id,
                course_id: course_id,
                folder_id: files[i].folder_id,
                display_name: files[i].display_name,
                filename: files[i].filename,
                'content-type': files[i]['content-type'],
                size: files[i].size,
                created_at: files[i].created_at,
                updated_at: files[i].updated_at,
            }
        }
        //console.log(files);
        let num_created = 0;
        let num_modified = 0;
        let num_unchanged = 0;
        await database.select('*').from('file').whereIn('id', file_id_arr)
            .then(rows => {
                for (let i = 0; i < rows.length; i++) {
                    const id = rows[i].id;
                    if (files_map.hasOwnProperty(id)) {
                        if (files_map[id].updated_at == rows[i].updated_at) {
                            files_map[id].modified = false;
                            num_unchanged++;
                            log('log', `File(${id}) Unchanged: ${files_map[id].filename}`);
                        } else {
                            files_map[id].modified = true;
                            //num_modified++;
                            log('log', `File(${id}) Modified: ${files_map[id].filename}`);
                        }
                        files_map[id].created = false;
                    }
                }
            }).catch(e => {
                console.log(e);
            });


        const asyncParallelLimit = config.get('sync.parallel_limit');
        log('info', `Async in parallel (maximum: ${asyncParallelLimit})`);

        const asyncFunc = function (i) {
            return async function (callback) {
                const file = files_map[files[i].id];
                if (file.created) {
                    log('log', `File(${file.id}) Created: ${file.filename}`);
                }
                if (file.created || file.modified) {
                    //console.log(file);
                    try {
                        const url = file.url;
                        let buffer;

                        await download(url).then((data) => {
                            log('info', `File(${file.id}) Downloaded: ${file.filename}`);
                            buffer = data;
                        });

                        let err = fs.writeFileSync(path.resolve('./temp_files', file.filename), buffer);
                        if (err) throw err;

                        const hash = await qiniu.upload('./temp_files', file.filename);
                        log('info', `File(${file.id}) Uploaded: hash: ${hash}`);

                        if (file.created) {
                            await database('file').insert(files[i]).then().catch(e => {
                                throw e;
                            });
                            num_created++;
                        } else {
                            await database('file').update(files[i]).where('id', file.id).then().catch(e => {
                                throw e;
                            });
                            num_modified++;
                        }

                        await fs.unlink(path.resolve('./temp_files', file.filename), async err => {
                            if (err) throw err;
                        });

                    } catch (err) {
                        log('warn', err);
                    }
                }
                callback(null, i);
            }
        };

        let asyncFuncArr = [];
        for (let i = 0; i < files.length; i++) {
            asyncFuncArr.push(asyncFunc(i));
        }
        await pify(async.parallelLimit)(asyncFuncArr, asyncParallelLimit).then(results => {
            //console.log(results);
        }).catch(err => {
            log('warn', err);
        });

        let num_failed = files.length - num_created - num_modified - num_unchanged;

        log('info', `${num_created} file(s) created, ${num_modified} file(s) modified, ${num_unchanged} file(s) unchanged`);
        if (num_failed > 0) log('warn', `${num_failed} file(s) failed, try again later`);

        for (let i = 0; i < folders.length; i++) {
            let folder = folders[i];
            folders[i] = {
                id: folders[i].id,
                course_id: course_id,
                parent_folder_id: folders[i].parent_folder_id,
                name: folders[i].name,
                created_at: folders[i].created_at,
                updated_at: folders[i].updated_at
            }
        }

        let error;
        let raw = await database('folder').insert(folders).toString() +
            ' ON DUPLICATE KEY UPDATE parent_folder_id = VALUES(parent_folder_id), name = VALUES(name),' +
            ' created_at = VALUES(created_at), updated_at = VALUES(updated_at)';
        await database.raw(raw).then(data => {
            if (data.length > 0) {
                // Reversed for look-behind
                let message = data[0].message.split('').reverse().join('');
                let duplicates = message.match(/[\d]+(?= :setacilpuD)/);
                duplicates = duplicates.length > 0 ? duplicates[0] : 0;
                let records = message.match(/[\d]+(?= :sdroceR)/);
                records = records.length > 0 ? records[0] : 0;
                num_modified = data[0].affectedRows - records;
                num_created = records - duplicates;
                num_unchanged = folders.length - num_modified - num_created;
            } else {
                error = 'unknown error';
            }
        }).catch(e => {
            error = e;
        });

        if (!error) {
            log('info', `${num_created} folder(s) created, ${num_modified} folder(s) modified, ${num_unchanged} folder(s) unchanged`);
        } else {
            log('warn', error);
        }

        await database('course').where({id: course_id}).update({sync_time: database.fn.now()}).then(data => {
            log('info', 'Sync time updated');
        }).catch(e => {
            log('warn', e);
        });

        log('info', '---------- Sync finished ---------- ');

        if (num_failed > 0)return {
            code: 500,
            message: 'some of the files failed'
        };

    }
}

module.exports = new Sync();