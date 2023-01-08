const { Router } = require('express');
const ForgotPasswordController = require('../../../useCases/forgotPassword/ForgotPasswordController');

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post('/forgot', forgotPasswordController.handle);

module.exports = passwordRoutes;
