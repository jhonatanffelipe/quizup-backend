const dotenv = require('dotenv');
require('express-async-errors');

const { json } = require('express');
const express = require('express');

const upload = require('./config/upload');
const AppError = require('./shared/infra/http/errors/AppError');
const ErrorHandler = require('./shared/infra/http/errors/ErrorHandler');
const routes = require('./shared/infra/http/routes/index.routes');

dotenv.config();

const app = express();

app.use(json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));

try {
  app.use(routes);
} catch (error) {
  throw new AppError(error);
}

// eslint-disable-next-line no-unused-vars
app.use(ErrorHandler);

module.exports = app;
