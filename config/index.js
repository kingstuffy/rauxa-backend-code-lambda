const _ = require('lodash');

const env = _.lowerCase(process.env.NODE_ENV || 'development');
const config = require(`./env/${env}`);
console.log(env, config);

module.exports = config;