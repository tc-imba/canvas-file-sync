/**
 * Created by liu on 17-4-26.
 */
const sync = require('../lib/sync');
const fs = require('fs');

if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

setTimeout(async () => {
    await sync.syncCourse(1);
    process.exit(0);
}, 0);

