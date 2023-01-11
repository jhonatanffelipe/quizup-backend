const RefreshTokenUseCase = require('./RefreshTokenUseCase');

class RefreshTokenController {
  async handle(request, response) {
    const refreshToken = request.body.refreshToken || request.headers['x-refreshToken'] || request.query.refreshToken;

    const refreshTokenUseCase = new RefreshTokenUseCase();

    const refreshTokenNew = await refreshTokenUseCase.execute(refreshToken);

    return response.json(refreshTokenNew);
  }
}

module.exports = RefreshTokenController;
