const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ListUsersUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async excute() {
    const users = await this.usersRepository.find();
    return users.map(user => {
      delete user.password;
      user.avatar = user.avatar && `${process.env.BACKEND_APP_URL}/avatar/${user.avatar}`;
      return user;
    });
  }
}

module.exports = ListUsersUseCase;
