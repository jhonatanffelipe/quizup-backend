const ListUsersUseCase = require('./ListUsersUseCase');

class ListUsersController {
  async handle(request, response) {
    const { page, perPage } = request.query;

    const listUsersUseCase = new ListUsersUseCase();
    const users = await listUsersUseCase.excute({ page: Number(page), perPage: Number(perPage) });

    return response.json(users);
  }
}

module.exports = ListUsersController;
