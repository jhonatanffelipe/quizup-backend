const dotenv = require('dotenv');
require('express-async-errors');

const { json } = require('express');
const express = require('express');
const cors = require('cors');

const upload = require('./config/upload');
const AppError = require('./shared/infra/http/errors/AppError');
const ErrorHandler = require('./shared/infra/http/errors/ErrorHandler');
const routes = require('./shared/infra/http/routes/index.routes');

dotenv.config();

const app = express();

app.use(cors());

app.use(json({ limit: '50mb' }));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/category', express.static(`${upload.tmpFolder}/category`));
app.use('/subject', express.static(`${upload.tmpFolder}/subject`));

try {
  app.use(routes);
} catch (error) {
  throw new AppError(error);
}

app.use(ErrorHandler);

module.exports = app;
