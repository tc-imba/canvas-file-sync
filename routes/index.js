const express = require('express');
const router = express.Router();
const path = require('path');
const database = require('../lib/database');
const config = require('config');
const oauth = require('../lib/oauth');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
