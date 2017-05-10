const express = require('express');
const router = express.Router();
const path = require('path');
const oauth = require('../lib/oauth');
const user = require('../lib/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/auth', async (req, res, next) => {
    const AUTH_URL = '/auth';
    try {
        if (!req.query.code) {
            const authURL = oauth.getAuthorizeURL(AUTH_URL);
            console.log(authURL);
            res.redirect(authURL);
        } else {
            const data = await oauth.getToken(req.query.code, AUTH_URL);
            if (!data.e) {
                // Success
                await user.update(data.access_token, data.refresh_token, data.results);
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

module.exports = router;
