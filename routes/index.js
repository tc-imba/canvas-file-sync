const express = require('express');
const router = express.Router();
const OAuth = require('oauth');
const crypto = require('crypto');
const https = require('https');
const database = require('../lib/database');
const config = require('config');

const oauth2 = new OAuth.OAuth2(
    config.get('oauth.client_id'),
    config.get('oauth.client_secret'),
    config.get('oauth.host'),
    config.get('oauth.authorize_path'),
    config.get('oauth.access_token_path'),
    null
);
let redirect_uri;
if (config.has('server.url')) redirect_uri = config.get('server.url');
else {
    redirect_uri = 'http://' + config.get('server.host');
    if (config.has('server.port')) redirect_uri += ':' + config.get('server.port');
    redirect_uri += '/';
}

/* GET home page. */
router.get('/', function (req, res, next) {
    const token = 'iUdYbieJa90BRBibV7DddwgBdMGfYgcWouGUY3seGRhnOuoVNXZRVcVh156EHkt4';
    if (req.session.view) {
        req.session.view++;
    } else {
        req.session.view = 1;
    }
    oauth2.get(config.get('oauth.host') + 'api/v1/courses', token, (error, data) => {
        if (!error) {
            const courses = JSON.parse(data);
            for (let i = 0; i < courses.length; i++) {
                let course = courses[i];
                console.log(course.id);
                console.log(course.name);
                oauth2.get(config.get('oauth.host') + 'api/v1/courses/' + course.id + '/files', token, (error, data) => {
                    if (!error) {
                        const files = JSON.parse(data);
                        for (let i = 0; i < files.length; i++) {
                            let file = files[i];
                            console.log(file);
                        }
                    } else {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log(error);
        }
    });


    //console.log(req.session.access_token);
    res.render('index', {title: 'Express'});
});

router.get('/auth', function (req, res, next) {
    if (!req.query.code) {
        const randomState = crypto.randomBytes(32).toString('hex');
        redirect_uri += 'auth';
        const authURL = oauth2.getAuthorizeUrl({
            redirect_uri: redirect_uri,
            state: randomState,
            response_type: 'code'
        });
        console.log(authURL);
        res.redirect(authURL);
    } else {
        oauth2.getOAuthAccessToken(
            req.query.code, {
                'grant_type': 'authorization_code',
                redirect_uri: redirect_uri
            }, function (e, access_token, refresh_token, results) {
                console.log(e);
                console.log(access_token);
                console.log(refresh_token);
                console.log(results);
                if (!e) {
                    req.session.user_id = results.user.id;
                    req.session.user_name = results.user.name;
                    req.session.access_token = access_token;
                    req.session.refresh_token = refresh_token;
                }
                res.redirect('/');
            }
        )
    }
    //res.send('1');
});

module.exports = router;
