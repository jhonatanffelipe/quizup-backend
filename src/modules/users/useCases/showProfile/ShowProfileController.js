const ShowProfileUserUseCase = require('./ShowProfileUseCase');

class ShowProfileController {
  async handle(request, response) {
    const showProfileUserUseCase = new ShowProfileUserUseCase();
    const { id } = request.user;

    const user = await showProfileUserUseCase.execute({ id });

    return response.json(user);
  }
}

module.exports = ShowProfileController;
