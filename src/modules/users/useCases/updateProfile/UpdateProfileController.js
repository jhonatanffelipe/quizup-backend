const UpdateProfileUseCase = require('./UpdateProfileUseCase');

class UpdateProfileController {
  async handle(request, response) {
    const updateProfileUseCase = new UpdateProfileUseCase();
    const { id } = request.user;
    const { name, email, password, confirmPassword } = request.body;

    await updateProfileUseCase.execute({ id, name, email, password, confirmPassword });

    return response.status(201).send();
  }
}

module.exports = UpdateProfileController;
