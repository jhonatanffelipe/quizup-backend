const { verify } = require('jsonwebtoken');

const auth = require('../../../../../config/auth');
const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token é obrigatório!', 401);
  }

  const [, accessToken] = authHeader.split(' ');

  try {
    const { sub } = verify(accessToken, auth.secretAccessToken);

    const usersToken = await knex('usersTokens').where({ userId: sub, accessToken }).first();

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
