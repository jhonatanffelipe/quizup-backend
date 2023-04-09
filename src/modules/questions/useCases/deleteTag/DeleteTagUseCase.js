const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class DeleteCategoryUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const existsCategory = await this.tagsRepository.findById(id);

    if (!existsCategory) {
      throw new AppError('Tag não encontrada.');
    }

    await this.tagsRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
