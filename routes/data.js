/**
 * Created by liu on 17-4-30.
 */
const express = require('express');
const router = express.Router();
const database = require('../lib/database');
const config = require('config');

router.get('/', async (req, res, next) => {

});

router.get('/course', async (req, res, next) => {
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
        response.download_host = config.get('qiniu.host');
        response.course = course;
        await database.select('*').from('file').orderBy('display_name', 'asc').where({course_id: course.id}).then(rows => {
            response.files = rows;
            return database.select('*').from('folder').orderBy('name', 'asc').where({course_id: course.id});
        }).then(rows => {
            response.folders = rows;
        }).catch(error => {
            response.error = error;
        });
    }
    res.send(response);
});

module.exports = router;