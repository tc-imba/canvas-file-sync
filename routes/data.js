/**
 * Created by liu on 17-4-30.
 */
const express = require('express');
const router = express.Router();
const database = require('../lib/database');
const sync = require('../lib/sync');
const config = require('config');


async function getCourse(req) {
    let response = {};
    let course;
    if (!req.query.id) {
        response.error = 'No course id in query';
    } else {
        await database.select('*').from('course').where({id: req.query.id}).then(rows => {
            if (rows.length > 0 && rows[0].id == req.query.id) {
                course = rows[0];
            } else {
                response.error = 'Course id not found';
            }
        }).catch(error => {
            response.error = error;
        });
    }
    if (course) {
        response.course = course;
    }
    return response;
}

router.get('/', async (req, res, next) => {

});

router.get('/course', async (req, res, next) => {
    let response = await getCourse(req);
    if (response.course) {
        const now = Date.now();
        const last_sync = Date.parse(response.course.sync_time);
        if (last_sync + config.get('sync.auto_sync_interval') * 1000 <= now) {
            response.sync = true;
            await sync.addCourseToQueue(response.course.id);
        } else {
            response.sync = false;
        }
        response.download_host = config.get('qiniu.host');
        await database.select('*').from('file').orderBy('display_name', 'asc')
            .where({course_id: response.course.id}).then(rows => {
                response.files = rows;
                return database.select('*').from('folder').orderBy('name', 'asc').where({course_id: response.course.id});
            }).then(rows => {
                response.folders = rows;
            }).catch(error => {
                response.error = error;
            });
    }
    res.send(response);
});

router.get('/sync', async (req, res, next) => {
    let response = await getCourse(req);
    if (response.course) {
        if (req.query.time) {
            const last_time = req.query.time;
            const new_time = Date.parse(response.course.sync_time);
            console.log(last_time, new_time);
            if (last_time && new_time && last_time < new_time) {
                response.state = 1; // Refresh now
            }
        }
        if (!response.state) {
            let result = await sync.addCourseToQueue(response.course.id);
            if (result.error) response.error = result.error;
            else response.state = result.state;
        }
    }
    res.send(response);
});

module.exports = router;