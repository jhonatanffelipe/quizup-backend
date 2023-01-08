const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ShowProfileUserUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute({ id }) {
    const user = await this.usersRepository.findById(id);
    delete user.password;
    user.avatar = `${process.env.BACKEND_APP_URL}/avatar/${user.avatar}`;
    return user;
  }
}

module.exports = ShowProfileUserUseCase;
