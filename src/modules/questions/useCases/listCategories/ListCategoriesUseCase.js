const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class ListCategoriesUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute() {
    const categories = await this.categoriesRepository.find();
    return categories.map(category => {
      category.image = category.image && `${process.env.BACKEND_APP_URL}/category/${category.image}`;
      return category;
    });
  }
}

module.exports = ListCategoriesUseCase;
