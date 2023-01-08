const AppError = require('../../../../shared/infra/http/errors/AppError');
const AuthenticateUserUseCase = require('./AuthenticateUserUseCase');

class AuthenticateUserContoller {
  async handle(request, response) {
    try {
      const { email, password } = request.body;

      const authenticateUserUseCase = new AuthenticateUserUseCase();

      const token = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(201).json(token);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = AuthenticateUserContoller;
