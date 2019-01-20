'use strict';

const connectToDatabase = require('./db');
const contactController = require('./controllers/contactController');

function HTTPError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error
}

module.exports.healthCheck = async () => {
    await connectToDatabase();
    console.log('Connection successful.');
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Connection successful.' })
    }
};

module.exports.create = contactController.create;