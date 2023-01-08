const { Router } = require('express');
const multer = require('multer');

const ensureAuthenticated = require('../middlewares/esureAuthenticated');
const uploadConfig = require('../../../../../config/upload');

const CreateUserController = require('../../../useCases/createUser/CreateUserController');
const ListUsersController = require('../../../useCases/listUsers/ListUsersController');
const ShowProfileController = require('../../../useCases/showProfile/ShowProfileController');
const UpdateProfileController = require('../../../useCases/updateProfile/UpdateProfileController');
const UpdateProfileAvatarController = require('../../../useCases/updateProfileAvatar/UpdateProfileAvatarController');
const UpdateUserController = require('../../../useCases/updateUser/UpdateUserController');
const ensureAdmin = require('../middlewares/ensureAdmin');

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const updateProfileController = new UpdateProfileController();
const showProfileController = new ShowProfileController();
const updateProfileAvatarController = new UpdateProfileAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.put('/profile', updateProfileController.handle);
usersRoutes.get('/profile', showProfileController.handle);
usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateProfileAvatarController.handle);
usersRoutes.put('/:id', ensureAdmin, updateUserController.handle);

module.exports = usersRoutes;
