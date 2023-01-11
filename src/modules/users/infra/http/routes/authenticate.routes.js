const { Router } = require('express');
const AuthenticateUserContoller = require('../../../useCases/authenticateUser/AuthenticateUserController');
const RefreshTokenController = require('../../../useCases/refreshToken/RefreshTokenController');

const authenticateUserRoutes = Router();

const authenticateUserContoller = new AuthenticateUserContoller();
const refreshTokenController = new RefreshTokenController();

authenticateUserRoutes.post('/', authenticateUserContoller.handle);
authenticateUserRoutes.post('/refresh-token', refreshTokenController.handle);

module.exports = authenticateUserRoutes;
