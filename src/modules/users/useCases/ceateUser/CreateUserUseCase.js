const { hashSync } = require('bcryptjs');
const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class CreateUserUseCase {
  async execute(name, email, password, confirmPassword, isAdmin) {
    try {
      const user = await knex('users').where({ email });

      if (user.length > 0) {
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

      await knex('users').insert({
        name,
        email,
        password: passwordHash,
        isAdmin,
      });
    } catch (error) {
      throw new AppError('Erro ao inserir o usuário, por favor contate o suporte técnico.');
    }
  }
}

module.exports = CreateUserUseCase;
