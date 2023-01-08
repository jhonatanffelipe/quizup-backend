const AppError = require('../../../../shared/errors/AppError');
const CreateUserUseCase = require('./CreateUserUseCase');

class CreateUserController {
  async handle(request, response) {
    const createUserUseCase = new CreateUserUseCase();

    const { name, email, password, confirmPassword, isAdmin } = request.body;

    await createUserUseCase
      .execute(name, email, password, confirmPassword, isAdmin)
      .then(() => response.status(201).send())
      .catch(error => {
        throw new AppError(error);
      });
  }
}

module.exports = CreateUserController;
