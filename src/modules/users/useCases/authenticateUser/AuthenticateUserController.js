const AuthenticateUserUseCase = require('./AuthenticateUserUseCase');

class AuthenticateUserContoller {
  async handle(request, response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(201).json(token);
  }
}

module.exports = AuthenticateUserContoller;
