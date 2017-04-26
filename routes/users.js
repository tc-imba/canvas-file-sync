const express = require('express');
const router = express.Router();
const oauth = require('../lib/oauth');
const user = require('../lib/user');
const course = require('../lib/course');

const AUTH_URL = 'users/auth';

router.get('/', async (req, res, next) => {
    try {
        if (req.session.user_id) {
            const data = await oauth.get(['api', 'v1', 'courses'], req.session.access_token);
            res.send(data);
            await course.updateUserCourse(data, req.session.user_id);
        } else {
            // No session found
            res.redirect('/users/auth');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

router.get('/auth', async (req, res, next) => {
    try {
        if (!req.query.code) {
            const authURL = oauth.getAuthorizeURL(AUTH_URL);
            console.log(authURL);
            res.redirect(authURL);
        } else {

            const data = await oauth.getToken(req.query.code, AUTH_URL);
            if (!data.e) {
                // Success
                req.session.user_id = data.results.user.id;
                req.session.user_name = data.results.user.name;
                req.session.access_token = data.access_token;
                await user.update(data.access_token, data.refresh_token, data.results);
                res.redirect('/users');
            } else {
                res.redirect('/users/auth');
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

router.get('/refresh', async (req, res, next) => {
    req.session.user_id = 2;
    try {
        if (!(req.session.user_id > 0)) res.redirect('/users/auth');
        const user_info = await user.getUser(req.session.user_id);
        if (!user_info) res.redirect('/users/auth');
        const refresh_token = user_info.refresh_token;
        const data = await oauth.refreshToken(refresh_token, AUTH_URL);
        //console.log(data);
        if (!data.e) {
            // Success
            req.session.user_id = data.results.user.id;
            req.session.user_name = data.results.user.name;
            req.session.access_token = data.access_token;
            await user.update(data.access_token, data.refresh_token, data.results);
            res.redirect('/users');
        } else {
            res.redirect('/users/auth');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

module.exports = router;
