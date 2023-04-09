const { Router } = require('express');
const categoriesRoutes = require('../../../../modules/questions/infra/http/routes/categories.routes');
const tagsRoutes = require('../../../../modules/questions/infra/http/routes/tags.routes');
const subjectRoutes = require('../../../../modules/questions/infra/http/routes/subjects.routes');
const questionsTypesRoutes = require('../../../../modules/questions/infra/http/routes/questionsTypes.routes');

const authenticateUserRoutes = require('../../../../modules/users/infra/http/routes/authenticate.routes');
const passwordRoutes = require('../../../../modules/users/infra/http/routes/password.routes');
const usersRoutes = require('../../../../modules/users/infra/http/routes/users.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authenticateUserRoutes);
routes.use('/password', passwordRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/subjects', subjectRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/questions/types', questionsTypesRoutes);

module.exports = routes;
