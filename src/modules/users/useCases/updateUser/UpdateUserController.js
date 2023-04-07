const UpdateUserUseCase = require('./UpdateUserUseCase');

class UpdateUserController {
  async handle(request, response) {
    const updateUserUseCase = new UpdateUserUseCase();
    const { id } = request.params;
    const { name, email, password, confirmPassword, isActive, isAdmin } = request.body;

    await updateUserUseCase.execute({ id, name, email, password, confirmPassword, isActive, isAdmin });

    return response.status(201).send();
  }
}

module.exports = UpdateUserController;
