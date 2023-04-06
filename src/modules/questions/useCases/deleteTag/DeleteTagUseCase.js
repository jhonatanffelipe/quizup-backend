const AppError = require('../../../../shared/infra/http/errors/AppError');
const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class DeleteCategoryUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
  }

  async execute(id) {
    const existsCategory = await this.tagsRepository.findById(id);

    if (!existsCategory) {
      throw new AppError('Tag não encontrada.');
    }

    await this.tagsRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
