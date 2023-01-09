const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class UpdateCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute({ id, description }) {
    const categoryAlreadExists = await this.categoriesRepository.findById(id);

    if (!categoryAlreadExists) {
      throw new AppError('Categoria não encontrada', 400);
    }

    const descriptionAlreadExists = this.categoriesRepository.findByDescription(description);

    if (descriptionAlreadExists && descriptionAlreadExists.id !== id) {
      throw new AppError('Já existe uma categoria cadastrada com essa descrição', 400);
    }

    await this.categoriesRepository.update({ id, description });
  }
}

module.exports = UpdateCategoryUseCase;
