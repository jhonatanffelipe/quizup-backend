const { Router } = require('express');
const categoriesRoutes = require('../../../../modules/questions/infra/http/routes/categories.routes');

const authenticateUserRoutes = require('../../../../modules/users/infra/http/routes/authenticate.routes');
const passwordRoutes = require('../../../../modules/users/infra/http/routes/password.routes');
const usersRoutes = require('../../../../modules/users/infra/http/routes/users.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authenticateUserRoutes);
routes.use('/password', passwordRoutes);
routes.use('/categories', categoriesRoutes);

module.exports = routes;
