const knex = require('../../../../../config/db');

class UsersTokensRepository {
  async create({ userId, accessToken, accessTokenExpiresDate, refreshToken, refreshTokenExpiresDate }) {
    await knex('usersTokens').insert({
      userId,
      accessToken,
      accessTokenExpiresDate,
      refreshToken,
      refreshTokenExpiresDate,
    });
  }

  async findByUserId(userId) {
    const userToken = await knex('usersTokens').where({ userId });
    return userToken;
  }

  async findByUserIdAndAccessToken({ userId, accessToken }) {
    const userToken = await knex('usersTokens').where({ userId, accessToken }).first();
    return userToken;
  }

  async delete(id) {
    await knex('usersTokens').where({ id }).del();
  }

  async deleteByUserId(userId) {
    await knex('usersTokens').where({ userId }).del();
  }
}

module.exports = UsersTokensRepository;
