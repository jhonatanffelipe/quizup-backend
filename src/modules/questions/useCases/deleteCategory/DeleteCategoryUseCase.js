const knex = require('../../../../config/db');
const AppError = require('../../../../shared/infra/http/errors/AppError');

class DeleteCategoryUseCase {
  async execute(id) {
    try {
      const categoryAlreadExists = await knex('categories').where({ id }).first();

      if (!categoryAlreadExists.length) {
        throw new AppError('Categoria não encontrada');
      }

      await knex('categories').where({ id }).del();
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = DeleteCategoryUseCase;
