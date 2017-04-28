/**
 * Created by liu on 17-4-26.
 */
const fs = require('fs');
const database = require('./database');
const download = require('download');
const oauth = require('./oauth');
const qiniu = require('./qiniu');
const logger = require('./logger');
const _user = require('./user');

class Sync {

    async syncCourse(course_id) {

        const log = (level, str) => logger.log(level, `course(${course_id}) ${str}`);

        log('info', 'Sync begins');

        let files = [];
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
                return;
            }
            log('info', `Try to list the files with user(${user.id})`);
            if (user.access_token) {
                files = [];
                let page = 1;
                let success = false;
                while (true) {
                    try {
                        let page_files = await oauth.get(['api', 'v1', 'courses', course_id, 'files?page=' + page], user.access_token);
                        if (page_files.length === 0) {
                            success = true;
                            break;
                        }
                        else {
                            files = files.concat(page_files);
                            log('info', `Get ${page_files.length} file(s) on page ${page++}`);
                        }
                    } catch (error) {
                        refresh = true;
                        if (error.statusCode == 404) {
                            log('error', `Sync ended since a 404 error when accessing to ${error.url}`);
                            return;
                        } else {
                            log('warn', `User (${user.id}) failed to list the files, trying to refresh the token`);
                        }
                    }
                }
                if (success)break;
            }
            else {
                log('warn', `User (${user.id}) token not found, trying to refresh the token`);
                refresh = true;
            }
            if (refresh && user.refresh_token && refresh_first) {
                // Try to refresh the token
                refresh_first = false;
                try {
                    await _user.refresh(user.id, user.refresh_token);
                    continue;
                } catch (error) {
                    log('error', `User (id: ${user.id}) Token refresh error: ${error}`);
                }
            }
            if (!refresh_first) {
                // Delete the user course
                log('warn', `User (id: ${user.id}) failed again, remove this user`);
                try {
                    await database('user_course').where('user_id', user.id).delete().then().catch(e => {
                        error = e;
                    });
                    if (error)throw error;
                } catch (error) {
                    log('error', `Database error: ${error}`);
                }
                refresh_first = true;
            }
        }

        log('info', `Success, ${files.length} files(s) listed`);


        let files_map = {};
        let file_id_arr = [];
        for (let i = 0; i < files.length; i++) {
            files_map[files[i].id] = files[i];
            files_map[files[i].id].created = true;
            file_id_arr.push(files[i].id);
            files[i] = {
                id: files[i].id,
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
                            num_modified++;
                            log('log', `File(${id}) Modified: ${files_map[id].filename}`);
                            // filename won't change when the display_name is changed
                            /*if (files_map[id].filename != rows[i].filename) {
                             files_map[id].filename_old = rows[i].filename;
                             }*/
                        }
                        files_map[id].created = false;
                    }
                }
            }).catch(e => {
                console.log(e);
            });

        num_created = files.length - num_modified - num_unchanged;


        for (let i = 0; i < files.length; i++) {
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

                    await fs.writeFile('dist/' + file.filename, buffer, async err => {
                        if (err) throw err;
                    });

                    const hash = await qiniu.upload(file.filename);
                    log('info', `File(${file.id}) Uploaded: hash: ${hash}`);

                    if (file.created) {
                        await database('file').insert(files[i]).then().catch(e => {
                            console.log(e);
                        });
                    } else {
                        await database('file').update(files[i]).where('id', file.id).then().catch(e => {
                            console.log(e);
                        });
                    }
                    /*if (file.filename_old) {
                     await qiniu.remove(file.filename_old);
                     log('info', `File Removed: ${file.filename_old} (renamed)`);
                     }*/

                } catch (err) {
                    console.log(err);
                }
            }
        }

        log('info', `${num_created} file(s) created, ${num_modified} file(s) modified, ${num_unchanged} file(s) unchanged`);
        log('info', 'Sync finished');
    }
}

module.exports = new Sync();