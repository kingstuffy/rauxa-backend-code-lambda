const connectToDatabase = require('../db');

module.exports = {
    async validateMissingFields({ body, requiredFields }) {
        const missingFields = requiredFields.filter((field) => {
            return !body[field];
        });

        if (!missingFields.length) {
            return;
        }

        throw {
            statusCode: 200,
            message: `The following fields are missing: ${missingFields.join(', ')}`,
        }
    },

    async save(body) {
        const { Contact } = await connectToDatabase();
        return Contact.create(body);
    }
};