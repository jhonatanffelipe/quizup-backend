const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ListUserByIdUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async excute(id) {
    const user = await this.usersRepository.findById(id);

    delete user.password;
    user.avatar = user.avatar && `${process.env.BACKEND_APP_URL}/avatar/${user.avatar}`;
    return user;
  }
}

module.exports = ListUserByIdUseCase;
