const { sign, verify } = require('jsonwebtoken');

const auth = require('../../../../config/auth');
const AppError = require('../../../../shared/infra/http/errors/AppError');
const MomentDateProvider = require('../../../../shared/providers/DateProvider/MomentDateProvider');
const BCryptProvider = require('../../../../shared/providers/HashProvider/BCryptProvider');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');

const { secretAccessToken, expiresInAccessToken, expiresAccessTokenHours } = auth;

class AuthenticateUserUseCase {
  constructor() {
    this.usersRopository = new UsersRepository();
    this.usersTokensRopository = new UsersTokensRepository();
    this.hashProvider = new BCryptProvider();
  }

  async execute({ email, password }) {
    const dateProvider = new MomentDateProvider();

    const user = await this.usersRopository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const userId = user.id ? user.id : '';

    const passwordMatch = await this.hashProvider.comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const dateNow = dateProvider.dateNow();

    const expiredTokens = await this.usersTokensRopository.findByUserId(userId);

    for await (const userToken of expiredTokens) {
      if (userToken.accessTokenExpiresDate <= dateNow) {
        await this.usersTokensRopository.delete(userToken.id);
      }
    }

    const accessToken = sign({ email }, secretAccessToken, {
      subject: user.id,
      expiresIn: expiresInAccessToken,
    });

    const { iat, exp } = verify(accessToken, secretAccessToken);

    const accessTokenExpiresDate = dateProvider.addHours(expiresAccessTokenHours);

    await this.usersTokensRopository.create({
      userId,
      accessToken,
      accessTokenExpiresDate,
    });

    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email,
        avatar: (user.avatar = user.avatar && `${process.env.BACKEND_APP_URL}/avatar/${user.avatar}`),
        isAdmin: user.isAdmin,
      },
      accessToken,
      iat,
      exp,
    };

    return tokenReturn;
  }
}

module.exports = AuthenticateUserUseCase;
