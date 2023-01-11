const { verify, sign } = require('jsonwebtoken');

const AppError = require('../../../../shared/infra/http/errors/AppError');
const MomentDateProvider = require('../../../../shared/providers/DateProvider/MomentDateProvider');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');
const auth = require('../../../../config/auth');

const {
  secretAccessToken,
  expiresInAccessToken,
  expiresAccessTokenHours,
  secretRefreshToken,
  expiresRefreshTokenDays,
} = auth;

class RefreshTokenUseCase {
  constructor() {
    this.usersTokensRepository = new UsersTokensRepository();
    this.dateProvider = new MomentDateProvider();
  }

  async execute(refreshToken) {
    const payload = { sub: '', email: '' };

    try {
      const { sub, email } = verify(refreshToken, secretRefreshToken);

      payload.sub = sub;
      payload.email = email;
    } catch (_) {
      throw new AppError('Refresh token does not exists!');
    }

    const { sub, email } = payload;

    const userId = payload.sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, refreshToken);

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const accessToken = sign({ email }, secretAccessToken, {
      subject: sub,
      expiresIn: expiresInAccessToken,
    });

    const accessTokenExpiresDate = this.dateProvider.addHours(expiresAccessTokenHours);
    const refreshTokenExpiresDate = this.dateProvider.addDay(expiresRefreshTokenDays);

    await this.usersTokensRepository.create({
      userId,
      accessToken,
      accessTokenExpiresDate,
      refreshToken,
      refreshTokenExpiresDate,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = RefreshTokenUseCase;
