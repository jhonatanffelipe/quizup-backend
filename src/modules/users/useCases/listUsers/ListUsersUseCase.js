const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ListUsersUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async excute() {
    const users = await this.usersRepository.find();
    return users.map(user => {
      delete user.password;
      return user;
    });
  }
}

module.exports = ListUsersUseCase;
