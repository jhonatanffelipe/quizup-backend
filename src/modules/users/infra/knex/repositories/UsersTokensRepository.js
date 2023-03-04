const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class UsersTokensRepository {
  async create({ userId, accessToken, accessTokenExpiresDate }) {
    try {
      await knex('usersTokens').insert({
        userId,
        accessToken,
        accessTokenExpiresDate,
      });
    } catch (error) {
      throw new AppError('Erro ao gerar token do usuário. Por favor contate a equipe de suporte.');
    }
  }

  async findByUserId(userId) {
    try {
      const userToken = await knex('usersTokens').where({ userId });
      return userToken;
    } catch (error) {
      throw new AppError('Erro ao encontrar token do usuário. Por favor contate a equipe de suporte.');
    }
  }

  async findByUserIdAndAccessToken({ userId, accessToken }) {
    try {
      const userToken = await knex('usersTokens').where({ userId, accessToken }).first();
      return userToken;
    } catch (error) {
      throw new AppError('Erro ao encontrar token do usuário. Por favor contate a equipe de suporte.');
    }
  }

  async delete(id) {
    try {
      await knex('usersTokens').where({ id }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar token do usuário. Por favor contate a equipe de suporte.');
    }
  }

  async deleteByUserId(userId) {
    try {
      await knex('usersTokens').where({ userId }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar tokens do usuário. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = UsersTokensRepository;
