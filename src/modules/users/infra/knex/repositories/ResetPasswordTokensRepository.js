const knex = require('../../../../../config/db');

class ResetPasswordTokensRepository {
  async generateToken({ userId, token }) {
    await knex('resetPasswordToken').insert({ userId, token });
  }

  async findByToken(token) {
    const resetPasswordToken = await knex('resetPasswordToken').where({ token }).first();
    return resetPasswordToken;
  }

  async deleteByUserId(userId) {
    await knex('resetPasswordToken').where({ userId }).del();
  }
}

module.exports = ResetPasswordTokensRepository;
