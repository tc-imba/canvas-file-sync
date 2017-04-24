/**
 * Created by liu on 17-4-24.
 */
const OAuth = require('oauth');
const crypto = require('crypto');
const config = require('config');

const oauth2 = new OAuth.OAuth2(
    config.get('oauth.client_id'),
    config.get('oauth.client_secret'),
    config.get('oauth.host'),
    config.get('oauth.authorize_path'),
    config.get('oauth.access_token_path'),
    null
);

let base_url;
if (config.has('server.url')) base_url = config.get('server.url');
else {
    base_url = 'http://' + config.get('server.host');
    if (config.has('server.port')) base_url += ':' + config.get('server.port');
    base_url += '/';
}

module.exports = {

    authorize: (res, url) => {
        let redirect_uri = base_url + url;
        const randomState = crypto.randomBytes(32).toString('hex');
        const authURL = oauth2.getAuthorizeUrl({
            redirect_uri: redirect_uri,
            state: randomState,
            response_type: 'code'
        });
        console.log(authURL);
        res.redirect(authURL);
        //return authURL;
    },

    getToken: (res, req, code, url, callback) => {
        let redirect_uri = base_url + url;
        oauth2.getOAuthAccessToken(
            code, {
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
                if (callback) callback(e, access_token, refresh_token, results);
            }
        )
    },

    refreshToken: () => {
        //oauth2.post();
    },

    get: (url, access_token, callback) => {
        oauth2.get(config.get('oauth.host') + url, access_token, callback);
    }

};