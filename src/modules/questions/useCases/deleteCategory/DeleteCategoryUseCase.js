const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class DeleteCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const existsCategory = await this.categoriesRepository.findById(id);

    if (!existsCategory) {
      throw new AppError('Categoria não encontrada.');
    }

    const alreadExistsSubjectsisToCategory = await this.subjectsRepository.findAllByCategoryId({ categoryId: id });

    if (alreadExistsSubjectsisToCategory.subjects.length > 0) {
      throw new AppError('Categoria não pode ser deletada, existem assuntos vinculados.');
    }

    await this.categoriesRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
