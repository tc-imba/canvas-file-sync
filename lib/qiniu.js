/**
 * Created by liu on 17-4-26.
 */
const qiniu = require('qiniu');
const config = require('config');
const path = require('path');

qiniu.conf.ACCESS_KEY = config.get('qiniu.access_key');
qiniu.conf.SECRET_KEY = config.get('qiniu.secret_key');

const bucket = config.get('qiniu.bucket');
const client = new qiniu.rs.Client();

class Qiniu {

    upload(filepath, filename) {
        return new Promise((resolve, inject) => {
            const putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + filename);
            const token = putPolicy.token();
            const filePath = path.resolve(filepath, filename);
            const extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(token, filename, filePath, extra, function (err, ret) {
                if (!err) {
                    resolve(ret.hash);
                } else {
                    inject(err);
                }
            });
        });
    }

    remove(filename) {
        return new Promise((resolve, inject) => {
            client.remove(bucket, filename, function (err, ret) {
                if (!err) {
                    resolve(ret);
                } else {
                    inject(err);
                }
            });
        });
    }

}

module.exports = new Qiniu();