'use strict';

const connectToDatabase = require('./db');
const contactController = require('./controllers/contactController');

module.exports.healthCheck = async () => {
    await connectToDatabase();
    console.log('Connection successful.');
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Connection successful.' })
    }
};

module.exports.create = contactController.create;