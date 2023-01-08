const UpdateProfileUseCase = require('./UpdateProfileUseCase');

class UpdateProfileController {
  async handle(request, response) {
    const updateProfileUseCase = new UpdateProfileUseCase();
    const { id } = request.user;
    const { name, password, confirmPassword } = request.body;

    await updateProfileUseCase.execute({ id, name, password, confirmPassword });

    return response.status(201).send();
  }
}

module.exports = UpdateProfileController;
