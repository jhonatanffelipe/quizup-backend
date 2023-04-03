const AppError = require('../../../../shared/infra/http/errors/AppError');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');

class DeleteUserUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.usersTokensRepository = new UsersTokensRepository();
  }

  async execute(id) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    await this.usersRepository.delete(id);
  }
}

module.exports = DeleteUserUseCase;
