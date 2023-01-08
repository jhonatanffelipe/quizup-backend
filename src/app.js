const dotenv = require('dotenv');
require('express-async-errors');

const { json } = require('express');
const express = require('express');

const knex = require('./config/db');
const AppError = require('./shared/infra/http/errors/AppError');
const ErrorHandler = require('./shared/infra/http/errors/ErrorHandler');
const routes = require('./shared/infra/http/routes/index.routes');

dotenv.config();

const app = express();

knex();

app.use(json());

try {
  app.use(routes);
} catch (error) {
  throw new AppError(error);
}

// eslint-disable-next-line no-unused-vars
app.use(ErrorHandler);

module.exports = app;
