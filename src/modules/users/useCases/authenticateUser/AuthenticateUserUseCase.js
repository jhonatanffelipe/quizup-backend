const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const auth = require('../../../../config/auth');
const AppError = require('../../../../shared/infra/http/errors/AppError');
const MomentDateProvider = require('../../../../shared/providers/DateProvider/MomentDateProvider');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');

const {
  secretAccessToken,
  expiresInAccessToken,
  expiresAccessTokenHours,
  secretRefreshToken,
  expiresInRefreshToken,
  expiresRefreshTokenDays,
} = auth;

class AuthenticateUserUseCase {
  constructor() {
    this.usersRopository = new UsersRepository();
    this.usersTokensRopository = new UsersTokensRepository();
  }

  async execute({ email, password }) {
    const dateProvider = new MomentDateProvider();

    const user = await this.usersRopository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const userId = user.id ? user.id : '';

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const dateNow = dateProvider.dateNow();

    const expiredTokens = await this.usersTokensRopository.findByUserId(userId);

    for await (const userToken of expiredTokens) {
      if (userToken.refreshTokenExpiresDate <= dateNow) {
        await this.usersTokensRopository.delete(userToken.id);
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

    await this.usersTokensRopository.create({
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
  }
}

module.exports = AuthenticateUserUseCase;
