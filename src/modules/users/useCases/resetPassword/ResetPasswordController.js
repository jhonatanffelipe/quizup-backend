const ResetPasswordUseCase = require('./ResetPasswordUseCase');

class ResetPasswordController {
  async handle(request, response) {
    const { token, password, confirmPassword } = request.body;

    const resetPasswordUseCase = new ResetPasswordUseCase();

    await resetPasswordUseCase.execute({ token, password, confirmPassword });

    return response.status(200).send();
  }
}

module.exports = ResetPasswordController;
