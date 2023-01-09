const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class ListCategoryByIdUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute(id) {
    const category = await this.categoriesRepository.findById(id);
    category.image = `${process.env.BACKEND_APP_URL}/category/${category.image}`;
    return category;
  }
}

module.exports = ListCategoryByIdUseCase;
