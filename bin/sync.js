/**
 * Created by liu on 17-4-26.
 */
const sync = require('../lib/sync');
const pify = require('pify');
const async = require('neo-async');
const fs = require('fs');

if (!fs.existsSync('./temp_files')) fs.mkdirSync('./temp_files');

let first = true;

async.forever(
    async function (next) {
        if (first) {
            await sync.init();
            first = false;
        }
        let course_id = await sync.getFirstOfQueue();

        if (course_id < 0) {
            setTimeout(next, 10000);
            return;
        }

        let error = await sync.syncCourse(course_id);
        if (!error) await sync.removeCourseInQueue(course_id);
        else if (error.code === 404 || error.code === 403) {
            // Fatal error, remove the course in queue
            await sync.removeCourseInQueue(course_id);
        } else if (error.code === 500) {
            // Try again later
            await sync.refreshCourseInQueue(course_id);
        }

        next();

    },
    function (err) {
        console.log(err);
    }
);




