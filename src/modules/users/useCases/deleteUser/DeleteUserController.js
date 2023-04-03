const DeleteUserUseCase = require('./DeleteUserUseCase');

class DeleteUserController {
  async handle(request, response) {
    const deleteUserUseCase = new DeleteUserUseCase();
    const { id } = request.params;

    await deleteUserUseCase.execute(id);

    return response.status(201).send();
  }
}

module.exports = DeleteUserController;
