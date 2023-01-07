const dotenv = require('dotenv');
const express = require('express');

const knex = require('./config/db');
const routes = require('./routes/index.routes');

dotenv.config();

const app = express();

knex();

app.use(routes);

module.exports = app;
