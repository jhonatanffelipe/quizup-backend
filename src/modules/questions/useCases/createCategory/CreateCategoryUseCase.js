const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class CreateCategoryUseCase {
  async execute(description) {
    await knex('categories')
      .where({ description })
      .then(async (descriptionAlreadExists) => {
        if (descriptionAlreadExists.length > 0) {
          throw new AppError('Já existe uma categoria cadastrada com essa descrição');
        }
        await knex('categories').insert({ description });
      }).catch((error) => {
        throw new AppError(error);
      });
  }
}

module.exports = CreateCategoryUseCase;
