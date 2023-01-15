const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class CreateCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute(description) {
    const descriptionAlreadExists = await this.categoriesRepository.findByDescription(description);

    if (descriptionAlreadExists) {
      throw new AppError('Já existe uma categoria cadastrada com essa descrição');
    }

    await this.categoriesRepository.create(description);
  }
}

module.exports = CreateCategoryUseCase;
