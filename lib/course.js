/**
 * Created by liu on 17-4-26.
 */
const database = require('./database');

class Course {

    async updateUserCourse(course_arr, user_id) {
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
        await database.raw(raw).then().catch(e => {
            error = e;
        });
        console.log(raw);
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

}

module.exports = new Course();

