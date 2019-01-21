const Sequelize = require('sequelize');
const ContactModel = require('./models/Contact');
const config = require('./config').db;

const sequelize = new Sequelize(
    config.name,
    config.user,
    config.password,
    {
        dialect: 'mysql',
        host: config.host,
        port: config.port
    }
);

const Contact = ContactModel(sequelize, Sequelize);
const Models = { Contact };
const connection = {};

module.exports = async () => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.');
        return Models
    }

    await sequelize.sync();
    await sequelize.authenticate();
    connection.isConnected = true;
    console.log('=> Created a new connection.');
    return Models
};