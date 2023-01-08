const knex = require('../../../../config/db');
const AppError = require('../../../../shared/infra/http/errors/AppError');

class UpdateCategoryUseCase {
  async execute(id, description) {
    try {
      const categoryAlreadExists = await knex('categories').where({ id }).first();

      if (!categoryAlreadExists) {
        throw new AppError('Categoria não encontrada', 400);
      }

      const descriptionAlreadExists = await knex('categories').where({ description }).first();

      if (descriptionAlreadExists && descriptionAlreadExists.id !== id) {
        throw new AppError('Já existe uma categoria cadastrada com essa descrição', 400);
      }

      await knex('categories').where({ id }).update({ description });
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = UpdateCategoryUseCase;
