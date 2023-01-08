const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class ListUsersUseCase {
  async excute() {
    try {
      const users = await knex('users').orderBy('name');
      return users.map(user => {
        delete user.password;
        return user;
      });
    } catch (error) {
      throw new AppError('Erro ao listar os usuários, por favor contate o suporte técnico.');
    }
  }
}

module.exports = ListUsersUseCase;
