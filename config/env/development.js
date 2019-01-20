const development = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
    s3: {
        key: process.env.AWS_S3_KEY,
        secret: process.env.AWS_S3_SECRET,
        bucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_S3_REGION,
    },
};

module.exports = development;