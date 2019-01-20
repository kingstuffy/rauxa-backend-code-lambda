const Promise = require('bluebird');
const S3 = require('aws-sdk/clients/s3');
const s3Config = require('../config').s3;

const s3 = new S3({
    accessKeyId: s3Config.key,
    secretAccessKey: s3Config.secret,
});


module.exports = {
    putObject({ data, key, options = {} }) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: s3Config.bucket,
                Key: key,
                Body: data,
                ...options,
            };
            console.log(params, s3Config);

            s3.putObject(params, function (err) {
                if (err) {
                    return reject(err);
                }

                const url = `https://s3.amazonaws.com/${s3Config.bucket}/${key}`;
                return resolve(url);
            });
        });
    },
};
