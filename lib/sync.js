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

        const log = (level, str) => logger.log(level, `course_id: ${course_id}\t${str}`);

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
                log('warn', `No user token available for this course`);
                return;
            }
            //console.log(user);
            if (user.access_token) {
                try {
                    files = await oauth.get(['api', 'v1', 'courses', course_id, 'files'], user.access_token);
                    break;
                } catch (error) {
                    refresh = true;
                    log('warn', `User (id: ${user.id}) file listing error, trying to refresh the token`);
                }
            }
            else {
                log('warn', `User (id: ${user.id}) token not found, trying to refresh the token`);
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
                log('info', `User (id: ${user.id}) Delete all courses`);
                try {
                    await database.where('user_id', user.id).delete().then().catch(e => {
                        error = e;
                    });
                    if (error)throw error;
                } catch (error) {
                    log('error', `Database error: ${error}`);
                }
                refresh_first = true;
            }
        }

        let files_map = {};
        let file_id_arr = [];
        for (let i = 0; i < files.length; i++) {
            files_map[files[i].id] = files[i];
            files[i].created = true;
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
        await database.select('*').from('file').whereIn('id', file_id_arr)
            .then(rows => {
                //console.log(rows);
                for (let i = 0; i < rows.length; i++) {
                    const id = rows[i].id;
                    if (files_map.hasOwnProperty(id)) {
                        if (files_map[id].updated_at == rows[i].updated_at) {
                            files_map[id].modified = false;
                            log('info', `File not modified: ${files_map[id].filename}`);
                        } else {
                            files_map[id].modified = true;
                        }
                        files_map[id].created = false;
                    }
                }
            }).catch(e => {
                console.log(e);
            });

        for (let i = 0; i < files.length; i++) {
            const file = files_map[files[i].id];
            if (file.created || file.modified) {
                //console.log(file);
                try {
                    const url = file.url;
                    await download(url).then((data) => {
                        let err = fs.writeFileSync('dist/' + file.filename, data);
                        if (err) throw err;
                    });
                    const hash = await qiniu.upload(file.filename);
                    log('info', `File Uploaded: ${file.filename} (${hash})`);
                    if (file.created) {
                        await database('file').insert(files[i]).then().catch(e => {
                            console.log(e);
                        });
                    } else {
                        await database('file').update(files[i]).where('id', file.id).then().catch(e => {
                            console.log(e);
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        log('info', 'Sync finished');
    }
}

module.exports = new Sync();