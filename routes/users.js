const express = require('express');
const router = express.Router();
const oauth = require('../lib/oauth');
const user = require('../lib/user');

const AUTH_URL = 'users/auth';

/* GET users listing. */
router.get('/', async (req, res, next) => {
    res.send('respond with a resource');
});

router.get('/auth', async (req, res, next) => {
    if (!req.query.code) {
        const authURL = oauth.getAuthorizeURL(AUTH_URL);
        console.log(authURL);
        res.redirect(authURL);
    } else {
        const data = await oauth.getToken(req.query.code, AUTH_URL);
        console.log(data);
        if (!data.e) {
            // Success
            req.session.user_id = data.results.user.id;
            req.session.user_name = data.results.user.name;
            req.session.access_token = data.access_token;
            req.session.refresh_token = data.refresh_token;
            await user.update(data.access_token, data.refresh_token, data.results);
        }
        res.redirect('/users');
    }
});

router.get('/refresh', async (req, res, next) => {
    const refresh_token = 'wDWw86hI5PSjbSd0kZMm6Iwwtyn6bwnFiWt06CYkAFoOWMDeAl7eHO2KjwITq3eN';
    const data = await oauth.refreshToken(refresh_token, 'auth');
    console.log(data);
    await user.update(data.access_token, data.refresh_token, data.results);
    res.redirect('/users');
});

module.exports = router;
