const UpdateUserUseCase = require('./UpdateUserUseCase');

class UpdateUserController {
  async handle(request, response) {
    const updateUserUseCase = new UpdateUserUseCase();
    const { id } = request.user;
    const { name, password, confirmPassword } = request.body;

    await updateUserUseCase.execute({ id, name, password, confirmPassword });

    return response.status(201).send();
  }
}

module.exports = UpdateUserController;
