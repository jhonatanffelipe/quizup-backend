const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class UpdateCategoryUseCase {
  async execute(id, description) {
    try {
      const categoryAlreadExists = await knex('categories').where({ id });

      if (categoryAlreadExists.length === 0) {
        throw new AppError('Categoria não encontrada', 400);
      }

      const descriptionAlreadExists = await knex('categories').where({ description });

      if (descriptionAlreadExists.some(category => category.id !== id)) {
        throw new AppError('Já existe uma categoria cadastrada com essa descrição', 400);
      }

      await knex('categories').update({ description }).where({ id });
    } catch (error) {
      throw new AppError(error, 400);
    }
  }
}

module.exports = UpdateCategoryUseCase;
