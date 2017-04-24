# canvas-file-sync

canvas-file-sync is an Integration Application for Canvas LMS.

It use Qiniu Cloud to save files downloaded from the url provided by Canvas API.

## Environment

Node version under `v7.6.0` doesn't support ES2017 feature: `async/await`, so `babel-register` is used to translate the code, so the project may run on most versions of Nodejs.

A MySQL server is also needed, the preferred version is `5.x`, you may use the SQL script in `./sql` to set up the database.