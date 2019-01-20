const fileType = require('file-type');
const sharp = require('sharp');
const rp = require('request-promise');
const uuid = require('uuidv4');

const s3Service = require('./S3Service');
const allowedImageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
];

module.exports = {

    async upload(body) {
        const self = this;
        const fileBuffer = new Buffer(body['image'], 'base64');
        const fileTypeInfo = fileType(fileBuffer);

        if (fileBuffer.length > 500000 || !allowedImageTypes.includes(fileTypeInfo.mime)) {
            return {
                statusCode: '402',
                message: 'Not a valid file type or file too big.'
            };
        }

        const fileName = `${uuid()}.${fileTypeInfo.ext}`;
        const options = {
            ContentEncoding: 'base64',
            ContentType: fileTypeInfo.mime
        };

        try {
            const imgUrl = await s3Service.putObject({
                body: fileBuffer,
                key: fileName,
                options,
            });

            const thumbnailUrl = await self.generateThumbnail(fileBuffer);
            return {
                statusCode: 200,
                data: {
                    imgUrl,
                    thumbnailUrl,
                }
            }
        } catch (e) {
            return e;
        }
    },

    async generateThumbnail(fileBuffer) {
        const self = this;
        const { data, info } = await self.resize({
            srcData: fileBuffer,
            width: 180,
            height: 180
        });

        const key = `${uuid()}.${info.format}`;
        return s3Service.putObject({ data, key });
    },


    async resize({ srcData, width, height }) {
        return sharp(srcData)
            .rotate()
            .resize(width, height)
            .toBuffer({ resolveWithObject: true });
    },
};
