/**
 * Created by liu on 17-4-23.
 */
const mysql = require('mysql');
const config = require('config');
const connection = mysql.createConnection(config.get('database'));
module.exports = connection;