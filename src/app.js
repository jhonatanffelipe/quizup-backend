const dotenv = require('dotenv');
const { json } = require('express');
const express = require('express');

const knex = require('./config/db');
const routes = require('./routes/index.routes');

dotenv.config();

const app = express();

knex();

app.use(json());
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
