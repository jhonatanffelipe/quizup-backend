const AppError = require('../../../../../shared/infra/http/errors/AppError');
const UsersRepository = require('../../knex/repositories/UsersRepository');

async function ensureAdmin(request, response, next) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user?.isAdmin) {
    throw new AppError('Usuário não autorizado', 401);
  }

  return next();
}

module.exports = ensureAdmin;
