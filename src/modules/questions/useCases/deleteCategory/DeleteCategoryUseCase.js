const AppError = require('../../../../shared/infra/http/errors/AppError');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class DeleteCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.topicsRepository = new TopicsRepository();
  }

  async execute(id) {
    const existsCategory = await this.categoriesRepository.findById(id);

    if (!existsCategory) {
      throw new AppError('Categoria não encontrada.');
    }

    const alreadExistsTopisToCategory = await this.topicsRepository.findAllByCategoryId(id);

    if (alreadExistsTopisToCategory.length > 0) {
      throw new AppError('Categoria não pode ser deletada, existem tópicos vinculados.');
    }

    await this.categoriesRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
