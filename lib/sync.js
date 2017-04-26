/**
 * Created by liu on 17-4-26.
 */
const fs = require('fs');
const database = require('./database');
const oauth = require('./oauth');
const qiniu = require('./qiniu');
const download = require('download');

class Sync {

    async syncCourse(course_id) {
        let files = [];
        while (true) {
            let user = null;
            let error;
            try {
                await database.select('user_course.user_id', 'user.access_token', 'user.refresh_token')
                    .from('user_course').where('course_id', course_id)
                    .join('user', 'user_course.user_id', 'user.user_id').limit(1)
                    .then(rows => {
                        if (rows.length > 0) user = rows[0];
                    })
                    .catch(e => {
                        error = e;
                    });
                if (error)throw error;
            } catch (error) {
                console.log(error);
                continue;
            }
            if (!user)break;
            if (!user.access_token)continue;
            let access_token = user.access_token;
            try {
                files = await oauth.get(['api', 'v1', 'courses', course_id, 'files']);
                //console.log(files);
                break;
            } catch (error) {
                console.log(error);
                continue;
            }
        }
        let files_url = {};
        for (let i = 0; i < files.length; i++) {
            files_url[files[i].id] = files[i].url;
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

        console.log(files[4]);

        for (let i = 0; i < files.length; i++) {
            await download(files_url[files[i].id]).then((data) => {
                console.log(files[i].filename);
                fs.writeFile('dist/' + files[i].filename, data, async err => {
                    if (err) console.log(err);
                    else {
                        const hash = await qiniu.upload(files[i].filename);
                        console.log(files[i].filename, hash);
                    }
                });
            });
        }


    }
}

module.exports = new Sync();