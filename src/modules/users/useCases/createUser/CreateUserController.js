const CreateUserUseCase = require('./CreateUserUseCase');

class CreateUserController {
  async handle(request, response) {
    const createUserUseCase = new CreateUserUseCase();

    const { name, email, password, confirmPassword, isActive, isAdmin } = request.body;

    await createUserUseCase.execute(name, email, password, confirmPassword, isActive, isAdmin);

    return response.status(201).send();
  }
}

module.exports = CreateUserController;
