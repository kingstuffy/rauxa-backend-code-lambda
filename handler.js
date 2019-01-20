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
        const { Contact } = await connectToDatabase();
        const contact = await Contact.create(JSON.parse(event.body));
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