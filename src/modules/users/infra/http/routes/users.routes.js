const { Router } = require('express');
const CreateUserController = require('../../../useCases/ceateUser/CreateUserController');
const ListUsersController = require('../../../useCases/listUsers/ListUsersController');
const UpdateUserController = require('../../../useCases/updateUser/UpdateUserController');
const ensureAuthenticated = require('../middlewares/esureAuthenticated');

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.put('/', ensureAuthenticated, updateUserController.handle);

module.exports = usersRoutes;
