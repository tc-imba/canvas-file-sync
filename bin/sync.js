/**
 * Created by liu on 17-4-26.
 */
const sync = require('../lib/sync');

setTimeout(async () => {
    await sync.syncCourse(1);
    process.exit(0);
}, 0);

