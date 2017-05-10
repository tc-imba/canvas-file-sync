/**
 * Created by liu on 17-4-24.
 */
const fs = require('fs');
const path = require('path');
const datatime = require('silly-datetime');
const utils = require('./utils');
const database = utils.database;
const logger = utils.logger;

class User {
    log(level, str, user_id = '') {
        let time = datatime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        if (user_id) {
            logger.log(level, `[${time}] user(${user_id}) ${str}`);
        } else {
            logger.log(level, `[${time}] ${str}`);
        }
    }

    generateCourseInfo(course_arr) {
        let file_path = path.resolve('./public', 'courses.json');
        let error = fs.writeFileSync(file_path, JSON.stringify(course_arr));
        if (error)throw error;
    }

    async updateCourse(course_arr, user_id) {
        let error = null;
        let course_id_arr = [];
        let course_map = {};
        for (let i = 0; i < course_arr.length; i++) {
            const course = course_arr[i];
            course_id_arr.push(course.id);
            course_map[course.id] = {
                id: course.id,
                name: course.name,
                course_code: course.course_code
            };
        }
        course_arr = [];
        let new_course_arr = [];
        await database('course').whereIn('id', course_id_arr)
            .then(rows => {
                for (let i = 0; i < rows.length; i++) {
                    course_arr.push(course_map[rows[i].id]);
                    delete course_map[rows[i].id];
                }
            })
            .catch(e => {
                error = e;
            });
        if (error)throw error;

        // Update the courses
        for (let i in course_map) {
            new_course_arr.push(course_map[i]);
            course_arr.push(course_map[i]);
        }
        let raw = await database('course').insert(course_arr).toString() +
            ' ON DUPLICATE KEY UPDATE name = VALUES(name), course_code = VALUES(course_code)';
        await database.raw(raw).then(data => {
            if (data.length > 0) {
                // Reversed for look-behind
                let processed = utils.processSQLMessage(data);
                if (processed.num_created || processed.num_modified) {
                    this.generateCourseInfo(course_arr);
                }
            } else {
                error = 'unknown error';
            }
        }).catch(e => {
            error = e;
        });
        if (error)throw error;

        //
        for (let i = 0; i < course_arr.length; i++) {
            course_arr[i] = {course_id: course_arr[i].id, user_id: user_id};
        }
        await database('user_course').where('user_id', user_id).delete().then(() => {
            return database('user_course').insert(course_arr);
        }).catch(e => {
            error = e;
        });
        if (error)throw error;

        // Add the new courses into the queue
        if (new_course_arr.length > 0) {
            for (let i = 0; i < new_course_arr.length; i++) {
                new_course_arr[i] = {course_id: new_course_arr[i].id};
            }
            raw = await database('queue').insert(new_course_arr).toString() +
                ' ON DUPLICATE KEY UPDATE course_id = VALUES(course_id)';
            await database.raw(raw).then().catch(e => {
                error = e;
            });
            console.log(raw);
            if (error)throw error;
        }
    }

    async getCourse(user) {
        const oauth = require('./oauth');
        return await oauth.get(['api', 'v1', 'courses'], user.access_token);
    }

    async update(access_token, refresh_token, results) {
        let error = null;
        const user = {
            access_token: access_token,
            name: results.user.name,
            id: results.user.id,
            expires_in: results.expires_in,
        };
        if (refresh_token) user.refresh_token = refresh_token;

        // Update user data
        this.log('info', `Updating user info`, user.id);
        await database.select('*').from('user').where({id: results.user.id})
            .then(rows => {
                //console.log(rows);
                if (rows.length > 0) {
                    return database('user').where({id: results.user.id}).update(user);
                } else {
                    return database('user').insert(user);
                }
            })
            .catch(e => {
                error = e;
                //console.error(error);
            });
        if (error)throw error;

        // Update course data
        this.log('info', `Getting user courses`, user.id);
        let course_arr = await this.getCourse(user);
        this.log('info', `${course_arr.length} course(s) listed`, user.id);
        await this.updateCourse(course_arr, user.id);
        this.log('info', `User courses updated`, user.id);
    }

    async getUser(user_id) {
        let user = null;
        let error = null;
        await database.select('*').from('user').where({id: user_id})
            .then(rows => {
                if (rows.length > 0) user = rows[0];
            })
            .catch(e => {
                error = e;
                //console.log(error);
            });
        if (error)throw error;
        return user;
    }

    async refresh(user_id, refresh_token = null) {
        this.log('info', `----- Refresh begins -----`, user_id);
        try {
            if (!refresh_token) {
                let user = await this.getUser(user_id);
                refresh_token = user.refresh_token;
            }
            const oauth = require('./oauth');
            const data = await oauth.refreshToken(refresh_token, '/users/auth');
            if (!data.e) {
                // Success
                this.log('info', `Access Token refreshed`, user_id);
                await this.update(data.access_token, data.refresh_token, data.results);
            } else {
                this.log('warn', `Access Token failed to refresh`, user_id);
                throw data.e;
            }
        } catch (error) {
            this.log('warn', error, user_id);
            this.log('warn', `----- Refresh terminated -----`, user_id);
            return;
            //throw error;
        }
        this.log('info', `----- Refresh finished -----`, user_id);
    }

}

module.exports = new User();