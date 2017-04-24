/**
 * Created by liu on 17-4-24.
 */
const database = require('./database');
class User {

    constructor() {

    }

    async update(access_token, refresh_token, results) {
        database.connect();
        let query = 'SELECT * FROM user WHERE user_id=' + results.user.id;
        await database.query(query, function (err, rows, fields) {
            if (err) throw err;
            console.log(rows);
        });
        database.end();
    }

}

module.exports = new User();