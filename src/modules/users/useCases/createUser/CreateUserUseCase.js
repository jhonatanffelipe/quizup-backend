const { hashSync } = require('bcryptjs');
const AppError = require('../../../../shared/infra/http/errors/AppError');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class CreateUserUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(name, email, password, confirmPassword, isActive, isAdmin) {
    const user = await this.usersRepository.findByEmail(email.toLowerCase());

    if (user) {
      throw new AppError('Já existe um usuário criado com esse e-mail.');
    }

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

    await this.usersRepository.create({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
      isActive,
      isAdmin,
    });
  }
}

module.exports = CreateUserUseCase;
