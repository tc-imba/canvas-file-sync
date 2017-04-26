const express = require('express');
const router = express.Router();
const database = require('../lib/database');
const config = require('config');
const oauth = require('../lib/oauth');

/* GET home page. */
router.get('/', function (req, res, next) {
    const token = 'gFonShA7XOAPRe5mKJdxN2PSQttmgH4mDvoIJggmb25EJc57E7kqT8OS3aSEwAX6';
    const refresh_token = 'YwqISuKjWPlYRUFkrmi9jby7faudItfqTp09G8kPAU2m1NUNZq14wgNLYPVlqWP3';

   /* oauth.get('api/v1/courses', token, (error, data) => {
        if (!error) {
            const courses = JSON.parse(data);
            for (let i = 0; i < courses.length; i++) {
                let course = courses[i];
                console.log(course.id);
                console.log(course.name);
                oauth.get('api/v1/courses/' + course.id + '/files', token, (error, data) => {
                    if (!error) {
                        const files = JSON.parse(data);
                        for (let i = 0; i < files.length; i++) {
                            let file = files[i];
                            console.log(file.id);
                            console.log(file.display_name);
                            console.log(file.filename);
                            console.log(file.modified_at);
                        }
                    } else {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log(error);
        }
    });*/


    //console.log(req.session.access_token);
    res.render('index', {title: 'Express'});
});

module.exports = router;
