/**
 * Created by liu on 17-4-24.
 */
const OAuth = require('oauth');
const crypto = require('crypto');
const async = require('neo-async');
const config = require('config');
const user = require('./user');

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

class CanvasOAuth {

    getAuthorizeURL(url) {
        let redirect_uri = base_url + url;
        const randomState = crypto.randomBytes(32).toString('hex');
        return oauth2.getAuthorizeUrl({
            redirect_uri: redirect_uri,
            state: randomState,
            response_type: 'code'
        });
    }

    getToken(code, url) {
        let redirect_uri = base_url + url;
        return new Promise(function (resolve, reject) {
            oauth2.getOAuthAccessToken(
                code, {
                    'grant_type': 'authorization_code',
                    redirect_uri: redirect_uri
                }, function (e, access_token, refresh_token, results) {
                    resolve({
                        e: e,
                        access_token: access_token,
                        refresh_token: refresh_token,
                        results: results
                    });
                }
            );
        });
    }

    refreshToken(refresh_token, url) {
        let redirect_uri = base_url + url;
        return new Promise(function (resolve, reject) {
            oauth2.getOAuthAccessToken(
                refresh_token, {
                    'grant_type': 'refresh_token',
                    redirect_uri: redirect_uri
                }, function (e, access_token, refresh_token, results) {
                    resolve({
                        e: e,
                        access_token: access_token,
                        refresh_token: refresh_token,
                        results: results
                    });
                }
            );
        });

    }

    /**
     * This function is used for API GET Method
     * It will attempt to visit the server
     * @param arr           an array of the api url
     * @param access_token  the access token used for the api get
     * @returns {Promise}
     */
    get(arr, access_token) {
        let url = config.get('oauth.host');
        if (arr instanceof String) url += arr;
        else if (arr instanceof Array) {
            for (let i = 0; i < arr.length; i++)url += '/' + arr[i];
        }
        return new Promise(function (resolve, reject) {
            const times = 10;
            const interval = 1000;
            let i = 0;
            async.retry({
                    times: times, interval: interval
                }, function (callback) {
                    if (++i === times) {
                        setTimeout(function () {
                            let error = {statusCode: 408, message: 'Request timeout'};
                            reject(error);
                        }, interval);
                    }
                    oauth2.get(url, access_token, (error, data) => {
                        callback(null, true);
                        if (error) {
                            if (error.statusCode == 404) error.url = url;
                            reject(error);
                        }
                        else {
                            resolve(JSON.parse(data));
                        }
                    });
                }, function (error, result) {
                    //if (error) inject(error);
                }
            );
        });
    }
}

module.exports = new CanvasOAuth();