const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class ListCategoriesUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute({ page, perPage, description }) {
    const response = await this.categoriesRepository.find({ page, perPage, description });
    return response;
  }
}

module.exports = ListCategoriesUseCase;
