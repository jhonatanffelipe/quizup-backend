const { Router } = require('express');
const CreateUserController = require('../../../useCases/ceateUser/CreateUserController');
const ListUsersController = require('../../../useCases/listUsers/ListUsersController');
const ShowProfileController = require('../../../useCases/showProfile/ShowProfileController');
const UpdateUserController = require('../../../useCases/updateUser/UpdateUserController');
const ensureAuthenticated = require('../middlewares/esureAuthenticated');

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const showProfileController = new ShowProfileController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.put('/', updateUserController.handle);
usersRoutes.get('/profile', showProfileController.handle);

module.exports = usersRoutes;
