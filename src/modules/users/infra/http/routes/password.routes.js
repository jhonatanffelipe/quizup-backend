const { Router } = require('express');
const ForgotPasswordController = require('../../../useCases/forgotPassword/ForgotPasswordController');
const ResetPasswordController = require('../../../useCases/resetPassword/ResetPasswordController');

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', forgotPasswordController.handle);
passwordRoutes.put('/reset', resetPasswordController.handle);

module.exports = passwordRoutes;
