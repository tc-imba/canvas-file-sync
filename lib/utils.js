/**
 * Created by liu on 17-5-10.
 */
const winston = require('winston');
const config = require('config');

const knex = require('knex')({
    client: 'mysql',
    connection: config.get('database.connection'),
    pool: {
        min: 0,
        max: config.has('database.connection_limit') ? config.get('database.connection_limit') : 10
    }
});

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: 'all'
        })
    ]
});

let base_url;
if (config.has('server.url')) base_url = config.get('server.url');
else {
    base_url = 'http://' + config.get('server.host');
    if (config.has('server.port')) base_url += ':' + config.get('server.port');
    base_url += '/';
}

const local_file_dir = config.has('sync.local_file_dir') ? config.get('sync.local_file_dir') : './files';

function processSQLMessage(data) {
    let message = data[0].message.split('').reverse().join('');
    let duplicates = message.match(/[\d]+(?= :setacilpuD)/) || [];
    duplicates = duplicates.length > 0 ? parseInt(duplicates[0].split('').reverse().join('')) : 0;
    let records = message.match(/[\d]+(?= :sdroceR)/) || [];
    records = records.length > 0 ? parseInt(records[0].split('').reverse().join('')) : 0;
    return {
        num_modified: data[0].affectedRows - records,
        num_created: records - duplicates
    }
}

module.exports = {
    logger: logger,
    database: knex,
    base_url: base_url,
    local_file_dir: local_file_dir,
    processSQLMessage: processSQLMessage
};
