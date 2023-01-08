const knex = require('../../../../config/db');
const AppError = require('../../../../shared/infra/http/errors/AppError');

class ListUsersUseCase {
  async excute() {
    try {
      const users = await knex('users').orderBy('name');
      return users.map(user => {
        delete user.password;
        return user;
      });
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = ListUsersUseCase;
