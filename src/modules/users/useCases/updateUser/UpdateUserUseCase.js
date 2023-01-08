const AppError = require('../../../../shared/infra/http/errors/AppError');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');

class UpdateUserUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.usersTokensRepository = new UsersTokensRepository();
  }

  async execute({ id, name, isActive, isAdmin }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    await this.usersRepository.update({ id, name, isActive, isAdmin });
  }
}

module.exports = UpdateUserUseCase;
