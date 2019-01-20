const _ = require('lodash');
const contactService = require('../services/contactService');
const imageService = require('../services/imageService');

module.exports = {
    async create(event) {
        try {
            const body = JSON.parse(event.body);
            const requiredFields = ['name', 'phone', 'image'];
            await contactService.validateMissingFields({ body, requiredFields });

            const imgData = await imageService.upload(body);

            const payload = {
                ..._.omit(body, 'image'),
                ...imgData,
            };

            const contact = await contactService.save(payload);
            return {
                statusCode: 201,
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