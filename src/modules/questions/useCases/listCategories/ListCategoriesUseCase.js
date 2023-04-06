const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class ListCategoriesUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute({ page, perPage, description }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    const data = await this.categoriesRepository.find({ page, perPage, description });

    const response = {
      perPage,
      currentPage: page,
      totalRows: data.count,
      data: data.categories,
    };

    return response;
  }
}

module.exports = ListCategoriesUseCase;
