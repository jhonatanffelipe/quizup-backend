const ListUsersUseCase = require('./ListUsersUseCase');

class ListUsersController {
  async handle(request, response) {
    const listUsersUseCase = new ListUsersUseCase();
    const users = await listUsersUseCase.excute();

    return response.json(users);
  }
}

module.exports = ListUsersController;
