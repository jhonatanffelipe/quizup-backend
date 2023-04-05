const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class DeleteCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.subjectsRepository = new SubjectsRepository();
  }

  async execute(id) {
    const existsCategory = await this.categoriesRepository.findById(id);

    if (!existsCategory) {
      throw new AppError('Categoria não encontrada.');
    }

    const alreadExistsTopisToCategory = await this.subjectsRepository.findAllByCategoryId(id);

    if (alreadExistsTopisToCategory.length > 0) {
      throw new AppError('Categoria não pode ser deletada, existem assuntos vinculados.');
    }

    await this.categoriesRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
