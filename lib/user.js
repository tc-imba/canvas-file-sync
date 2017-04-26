/**
 * Created by liu on 17-4-24.
 */
const database = require('./database');
class User {

    async update(access_token, refresh_token, results) {
        let error = null;
        const data = {
            access_token: access_token,
            user_name: results.user.name,
            user_id: results.user.id,
            expires_in: results.expires_in,
        };
        if (refresh_token) data.refresh_token = refresh_token;

        await database.select('*').from('user').where({user_id: results.user.id})
            .then(rows => {
                //console.log(rows);
                if (rows.length > 0) {
                    return database('user').where({user_id: results.user.id}).update(data);
                } else {
                    return database('user').insert(data);
                }
            })
            .catch(e => {
                error = e;
                //console.error(error);
            });
        if (error)throw error;
    }

    async getUser(user_id) {
        let user = null;
        let error = null;
        await database.select('*').from('user').where({user_id: user_id})
            .then(rows => {
                if (rows.length > 0) user = rows[0];
            })
            .catch(e => {
                error = e;
                //console.log(error);
            });
        if (error)throw error;
        return user;
    }

}

module.exports = new User();