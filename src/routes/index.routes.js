const { Router } = require('express');

const usersRoutes = require('../modules/users/routes/users.routes');
const categoriesRoutes = require('../modules/questions/routes/categories.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);

module.exports = routes;
