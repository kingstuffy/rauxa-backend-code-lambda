'use strict';

const connectToDatabase = require('./db');

function HTTPError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error
};

module.exports.healthCheck = async () => {
    await connectToDatabase();
    console.log('Connection successful.');
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Connection successful.' })
    }
};

module.exports.create = async (event) => {
    try {
        //get the image data from upload
        const body = JSON.parse(event.body);

        const fileBuffer = new Buffer(body['image'], 'base64');
        const fileTypeInfo = fileType(fileBuffer);

        //validate image is on right type
        if (fileBuffer.length < 500000 && imageTypes.includes(fileTypeInfo.mime)) {

            // upload it to s3 with unix timestamp as a file name
            const fileName = `${Math.floor(new Date() / 1000)}.${fileTypeInfo.ext}`;

            const bucket = process.env.BUCKET;
            const params = {
                Body: fileBuffer,
                Key: fileName,
                Bucket: bucket,
                ContentEncoding: 'base64',
                ContentType: fileTypeInfo.mime
            };

            s3.putObject(params, (err, data) => {
                if (err) callback(new Error([err.statusCode], [err.message]));

                callback(null, {
                    statusCode: '200',
                    headers: {'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({'data': data})
                });
            });


        } else {
            callback(null, {
                statusCode: '402',
                headers: {'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({"message": "Not a valid file type or file too big."})
            });
        }
        // const { Contact } = await connectToDatabase();
        // const contact = await Contact.create(JSON.parse(event.body));
        return {
            statusCode: 200,
            body: JSON.stringify(contact)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not create the contact.'
        }
    }
};