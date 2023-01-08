const { Router } = require('express');
const CreateUserController = require('../useCases/ceateUser/CreateUserController');
const ListUsersController = require('../useCases/listUsers/ListUsersController');

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);

module.exports = usersRoutes;
