const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class DeleteCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute(id) {
    const categoryAlreadExists = await this.categoriesRepository.findById(id);

    if (!categoryAlreadExists) {
      throw new AppError('Categoria não encontrada.');
    }

    await this.categoriesRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
