const knex = require('../../../../config/db');
const AppError = require('../../../../shared/infra/http/errors/AppError');

class CreateCategoryUseCase {
  async execute(description) {
    try {
      const descriptionAlreadExists = await knex('categories').where({ description }).first();

      if (descriptionAlreadExists) {
        throw new AppError('Já existe uma categoria cadastrada com essa descrição');
      }

      await knex('categories').insert({ description });
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = CreateCategoryUseCase;
