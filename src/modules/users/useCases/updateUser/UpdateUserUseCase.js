const { hashSync } = require('bcryptjs');
const knex = require('../../../../config/db');
const AppError = require('../../../../shared/infra/http/errors/AppError');

class UpdateUserUseCase {
  async execute({ id, name, password, confirmPassword }) {
    try {
      const user = await knex('users').where({ id }).first();

      if (!user) {
        throw new AppError('Usuário não encontrado.');
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

        await knex('users').where({ id }).update({
          name,
          password: passwordHash,
        });

        await knex('usersTokens').where({ userId: id }).del();
      } else {
        await knex('users').where({ id }).update({
          name,
        });
      }
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = UpdateUserUseCase;
