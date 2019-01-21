const _ = require('lodash');
const contactService = require('../services/contactService');
const imageService = require('../services/imageService');

module.exports = {
    async create(event) {
        try {
            const body = JSON.parse(event.body);
            const requiredFields = ['name', 'phone', 'image'];
            await contactService.validateMissingFields({ body, requiredFields });


            imgData = await imageService.upload(body);
            const payload = {
                ..._.omit(body, 'image'),
                ...imgData,
            };

            const contact = await contactService.save(payload);
            return {
                statusCode: 201,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(contact),
            }

        } catch (err) {
            console.log(err);
            const statusCode = err.statusCode || 500;
            const message = err.message || 'Unable to create contact';

            return {
                statusCode,
                body: JSON.stringify({ message }),
            }
        }
    }
};
