const knexConnection = require('knex');
const config = require('../../knexfile');

const knex = knexConnection(config);

module.exports = knex;
