const { hashSync } = require('bcryptjs');
const AppError = require('../../../../shared/infra/http/errors/AppError');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');
const HashProvider = require('../../../../shared/providers/HashProvider/BCryptProvider');

class UpdateProfileUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.usersTokensRepository = new UsersTokensRepository();
    this.hashProvider = new HashProvider();
  }

  async execute({ id, name, email, currentPassword, password, confirmPassword }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (currentPassword || password || confirmPassword) {
      const passwordMatch = await this.hashProvider.comparePasswords(currentPassword, user.password);

      if (!passwordMatch) {
        throw new AppError('Senha atual incorreta!');
      }
    }

    if (password) {
      if (password !== confirmPassword) {
        throw new AppError('Senhas não são iguais, tente novamente!.');
      }

      const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/;

      if (!validate.test(password)) {
        throw new AppError(
          'Senha incorreta! Deve conter no mínimo 6 caracteres, ao menos um dígito, ao menos uma letra minúscula, ao menos um caractere especial e ao menos letra maiúscula',
          400,
        );
      }

      const passwordHash = hashSync(password, 8);

      await this.usersRepository.update({ id, name, email, password: passwordHash });

      // await this.usersTokensRepository.deleteByUserId(id);
    } else {
      await this.usersRepository.update({ id, name, email });
    }
  }
}

module.exports = UpdateProfileUseCase;
