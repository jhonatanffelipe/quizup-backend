const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class DeleteCategoryUseCase {
  async execute(id) {
    await knex('categories')
      .where({ id })
      .then(async (categoryAlreadExists) => {
        if (categoryAlreadExists.length === 0) {
          throw new AppError('Categoria não encontrada');
        }
        await knex('categories')
          .where({ id })
          .del();
      }).catch((error) => {
        throw new AppError(error);
      });
  }
}

module.exports = DeleteCategoryUseCase;
