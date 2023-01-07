const { Router } = require('express');

const categoriesRoutes = require('../modules/questions/routes/categories.routes');

const routes = Router();

routes.use('/categories', categoriesRoutes);

module.exports = routes;
