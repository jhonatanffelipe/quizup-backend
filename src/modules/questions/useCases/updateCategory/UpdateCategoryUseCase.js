const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');

class UpdateCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ id, description, isActive }) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const categoryAlreadExists = await this.categoriesRepository.findById(id);

    if (!categoryAlreadExists) {
      throw new AppError('Categoria não encontrada', 400);
    }

    const descriptionAlreadExists = await this.categoriesRepository.findByDescription(description);

    if (descriptionAlreadExists && descriptionAlreadExists.id !== id) {
      throw new AppError('Já existe uma categoria cadastrada com essa descrição', 400);
    }

    await this.categoriesRepository.update({ id, description, isActive });
  }
}

module.exports = UpdateCategoryUseCase;
