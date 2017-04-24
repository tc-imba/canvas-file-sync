/**
 * Created by liu on 17-4-24.
 */
const database = require('./database');
class User {

    constructor() {

    }

    async update(access_token, refresh_token, results) {
        const data = {
            access_token: access_token,
            user_name: results.user.name,
            user_id: results.user.id,
            expires_in: results.expires_in,
        };
        if (refresh_token) data.refresh_token = refresh_token;

        await database.select('*').from('user').where({user_id: results.user.id})
            .then(function (rows) {
                console.log(rows);
                if (rows.length > 0) {
                    return database('user').where({user_id: results.user.id}).update(data);
                } else {
                    return database('user').insert(data);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

}

module.exports = new User();