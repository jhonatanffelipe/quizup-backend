const AppError = require('../../../../shared/errors/AppError');
const ListUsersUseCase = require('./ListUsersUseCase');

class ListUsersController {
  async handle(request, response) {
    const listUsersUseCase = new ListUsersUseCase();
    const users = await listUsersUseCase
      .excute()
      .then(users => users)
      .catch(error => {
        throw new AppError(error);
      });
    return response.json(users);
  }
}

module.exports = ListUsersController;
