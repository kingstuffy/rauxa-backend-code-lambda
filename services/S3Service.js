const Promise = require('bluebird');
const S3 = require('aws-sdk/clients/s3');
const s3Config = require('./config').db;

const s3 = new S3({
    accessKeyId: s3Config.key,
    secretAccessKey: s3Config.secret,
});


module.exports = {
    putObject({ data, key }) {

        return new Promise((resolve, reject) => {

            const params = {
                Bucket: s3Config.bucket,
                Key: key,
                Body: data,
            };

            s3.putObject(params, function (err, data) {

                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });

        });

    },

    deleteObject(key) {

        return new Promise((resolve, reject) => {

            const params = {
                Bucket: s3Config.bucket,
                Key: key,
            };

            s3.deleteObject(params, function (err, data) {

                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });

        });

    }
};
