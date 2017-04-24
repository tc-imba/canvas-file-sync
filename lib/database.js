/**
 * Created by liu on 17-4-23.
 */
const config = require('config');
const knex = require('knex')({
    client: 'mysql',
    connection: config.get('database.connection'),
    pool: {
        min: 0,
        max: config.has('database.connection_limit') ? config.get('database.connection_limit') : 10
    }
});

module.exports = knex;