const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const auth = require('../../../../config/auth');
const knex = require('../../../../config/db');
const AppError = require('../../../../shared/infra/http/errors/AppError');
const MomentDateProvider = require('../../../../shared/providers/DateProvider/MomentDateProvider');

const {
  secretAccessToken,
  expiresInAccessToken,
  expiresAccessTokenHours,
  secretRefreshToken,
  expiresInRefreshToken,
  expiresRefreshTokenDays,
} = auth;

class AuthenticateUserUseCase {
  async execute({ email, password }) {
    try {
      const dateProvider = new MomentDateProvider();

      const user = await knex('users').where({ email }).first();

      if (!user) {
        throw new AppError('Email or password incorrect!');
      }

      const userId = user.id ? user.id : '';

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError('Email or password incorrect!');
      }

      const dateNow = dateProvider.dateNow();

      const expiredTokens = await knex('usersTokens').where({ userId });

      for await (const userToken of expiredTokens) {
        if (userToken.refreshTokenExpiresDate <= dateNow) {
          await await knex('usersTokens').where({ id: userToken.id }).del();
        }
      }

      const accessToken = sign({ email }, secretAccessToken, {
        subject: user.id,
        expiresIn: expiresInAccessToken,
      });

      const { iat, exp } = verify(accessToken, secretAccessToken);

      const accessTokenExpiresDate = dateProvider.addHours(expiresAccessTokenHours);

      const refreshTokenExpiresDate = dateProvider.addDay(expiresRefreshTokenDays);

      const refreshToken = sign({ email }, secretRefreshToken, {
        subject: user.id,
        expiresIn: expiresInRefreshToken,
      });

      await knex('usersTokens').insert({
        userId,
        accessToken,
        accessTokenExpiresDate,
        refreshToken,
        refreshTokenExpiresDate,
      });

      const tokenReturn = {
        user: {
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken,
        iat,
        exp,
      };

      return tokenReturn;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = AuthenticateUserUseCase;
