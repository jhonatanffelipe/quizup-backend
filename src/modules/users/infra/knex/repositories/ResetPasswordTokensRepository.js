const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class ResetPasswordTokensRepository {
  async generateToken({ userId, token }) {
    try {
      await knex('resetPasswordToken').insert({ userId, token });
    } catch (error) {
      throw new AppError('Erro ao gerar token. Por favor contate a equipe de suporte.');
    }
  }

  async findByToken(token) {
    try {
      const resetPasswordToken = await knex('resetPasswordToken').where({ token }).first();
      return resetPasswordToken;
    } catch (error) {
      throw new AppError('Erro ao buscar token. Por favor contate a equipe de suporte.');
    }
  }

  async deleteByUserId(userId) {
    try {
      await knex('resetPasswordToken').where({ userId }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar token. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = ResetPasswordTokensRepository;
