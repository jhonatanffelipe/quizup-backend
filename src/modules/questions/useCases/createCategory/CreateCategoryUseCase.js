const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class CreateCategoryUseCase {
  async execute(description) {
    try {
      const descriptionAlreadExists = await knex('categories').where({ description });

      if (descriptionAlreadExists.length > 0) {
        throw new AppError('Já existe uma categoria cadastrada com essa descrição');
      }

      await knex('categories').insert({ description });
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = CreateCategoryUseCase;
