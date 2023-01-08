const knex = require('../../../../config/db');
const AppError = require('../../../../shared/errors/AppError');

class ListCategoriesUseCase {
  async execute() {
    try {
      return await knex('categories').orderBy('description');
    } catch (error) {
      throw new AppError(error);
    }
  }
}

module.exports = ListCategoriesUseCase;
