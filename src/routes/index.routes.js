const { Router } = require('express');

const categoriesRoutes = require('./categories.routes');

const routes = Router();

routes.use('/categories', categoriesRoutes);

module.exports = routes;
