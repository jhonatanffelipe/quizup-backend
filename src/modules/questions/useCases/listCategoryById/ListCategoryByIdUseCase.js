const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');

class ListCategoryByIdUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada.');
    }

    category.image = category.image && `${process.env.BACKEND_APP_URL}/category/${category.image}`;
    return category;
  }
}

module.exports = ListCategoryByIdUseCase;
