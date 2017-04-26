/**
 * Created by liu on 17-4-24.
 */
const database = require('./database');
class User {

    async update(access_token, refresh_token, results) {
        let error = null;
        const data = {
            access_token: access_token,
            name: results.user.name,
            id: results.user.id,
            expires_in: results.expires_in,
        };
        if (refresh_token) data.refresh_token = refresh_token;

        await database.select('*').from('user').where({id: results.user.id})
            .then(rows => {
                //console.log(rows);
                if (rows.length > 0) {
                    return database('user').where({id: results.user.id}).update(data);
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
        await database.select('*').from('user').where({id: user_id})
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

    async refresh(user_id, refresh_token = null) {
        try {
            if (!refresh_token) {
                let user = await this.getUser(user_id);
                refresh_token = user.refresh_token;
            }
            const oauth = require('./oauth');
            const data = await oauth.refreshToken(refresh_token, '/users/auth');
            if (!data.e) {
                // Success
                await this.update(data.access_token, data.refresh_token, data.results);
            } else {
                throw data.e;
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new User();