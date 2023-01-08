const { verify } = require('jsonwebtoken');

const auth = require('../../../../../config/auth');
const AppError = require('../../../../../shared/infra/http/errors/AppError');
const UsersTokensRepository = require('../../knex/repositories/UsersTokensRepository');

async function ensureAuthenticated(request, response, next) {
  const usersTokensRepository = new UsersTokensRepository();
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token é obrigatório!', 401);
  }

  const [, accessToken] = authHeader.split(' ');

  try {
    const { sub } = verify(accessToken, auth.secretAccessToken);

    const usersToken = await usersTokensRepository.findByUserIdAndAccessToken({ userId: sub, accessToken });

    if (!usersToken) {
      throw new AppError('Token inválido!', 401);
    }

    request.user = {
      id: sub,
    };
    next();
  } catch {
    throw new AppError('Token inválido!', 401);
  }
}

module.exports = ensureAuthenticated;
