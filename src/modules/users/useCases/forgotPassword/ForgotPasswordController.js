const ForgotPasswordUseCase = require('./ForgotPasswordUseCase');

class ForgotPasswordController {
  async handle(request, response) {
    const { email } = request.body;

    const forgotPasswordUseCase = new ForgotPasswordUseCase();

    await forgotPasswordUseCase.execute({ email });

    return response.status(204).send();
  }
}

module.exports = ForgotPasswordController;
