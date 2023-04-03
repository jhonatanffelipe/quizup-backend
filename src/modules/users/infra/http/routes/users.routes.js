const { Router } = require('express');
const multer = require('multer');

const ensureAuthenticated = require('../middlewares/esureAuthenticated');
const uploadConfig = require('../../../../../config/upload');

const CreateUserController = require('../../../useCases/createUser/CreateUserController');
const ListUsersController = require('../../../useCases/listUsers/ListUsersController');
const ListUserByIdController = require('../../../useCases/listUserById/ListUserByIdController');
const ShowProfileController = require('../../../useCases/showProfile/ShowProfileController');
const UpdateProfileController = require('../../../useCases/updateProfile/UpdateProfileController');
const UpdateProfileAvatarController = require('../../../useCases/updateProfileAvatar/UpdateProfileAvatarController');
const UpdateUserController = require('../../../useCases/updateUser/UpdateUserController');
const DeleteUserController = require('../../../useCases/deleteUser/DeleteUserController');
const ensureAdmin = require('../middlewares/ensureAdmin');

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const listUserByIdController = new ListUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateProfileController = new UpdateProfileController();
const showProfileController = new ShowProfileController();
const updateProfileAvatarController = new UpdateProfileAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.put('/profile', updateProfileController.handle);
usersRoutes.get('/profile', showProfileController.handle);
usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateProfileAvatarController.handle);

usersRoutes.use(ensureAdmin);
usersRoutes.get('/:id', listUserByIdController.handle);
usersRoutes.put('/:id', updateUserController.handle);
usersRoutes.delete('/:id', deleteUserController.handle);

module.exports = usersRoutes;
