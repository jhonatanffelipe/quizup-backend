const dotenv = require('dotenv');
require('express-async-errors');

const { json } = require('express');
const express = require('express');

const knex = require('./config/db');
const routes = require('./routes/index.routes');
const ErrorHandler = require('./shared/errors/ErrorHandler');

dotenv.config();

const app = express();

knex();

app.use(json());
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use(ErrorHandler);

module.exports = app;
