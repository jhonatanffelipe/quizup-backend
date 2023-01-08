const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ShowProfileUserUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute({ id }) {
    const user = await this.usersRepository.findById(id);
    delete user.password;
    return user;
  }
}

module.exports = ShowProfileUserUseCase;
