const { Router } = require('express');
const AuthenticateUserContoller = require('../../../useCases/authenticateUser/AuthenticateUserController');

const authenticateUserRoutes = Router();

const authenticateUserContoller = new AuthenticateUserContoller();

authenticateUserRoutes.post('/', authenticateUserContoller.handle);

module.exports = authenticateUserRoutes;
