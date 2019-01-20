const connectToDatabase = require('../db');
const imageService = require('../services/imageService');

module.exports = {
    async create(event) {
        try {
            const body = JSON.parse(event.body);
            console.log(await imageService.upload(body));

            // const { Contact } = await connectToDatabase();
            // const contact = await Contact.create(event.body);
            return {
                statusCode: 200,
                body: 'dddd'
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Could not create the contact.'
            }
        }
    }
};