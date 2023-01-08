const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class ListCategoriesUseCase {
  async execute() {
    const categories = await knex('categories')
      .orderBy('description')
      .then((categories) => categories)
      .catch((error) => {
        throw new AppError(error);
      });

    return categories;
  }
}

module.exports = ListCategoriesUseCase;
