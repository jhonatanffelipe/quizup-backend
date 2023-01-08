const AppError = require('../../../../shared/infra/http/errors/AppError');
const UpdateUserUseCase = require('./UpdateUserUseCase');

class UpdateUserController {
  async handle(request, response) {
    try {
      const updateUserUseCase = new UpdateUserUseCase();
      const { id } = request.user;
      const { name, password, confirmPassword } = request.body;

      await updateUserUseCase.execute({ id, name, password, confirmPassword });

      return response.status(201).send();
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = UpdateUserController;
