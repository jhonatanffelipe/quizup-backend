const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class ListTagByIdUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Assunto inválido.');
    }

    const tag = await this.tagsRepository.findById(id);

    if (!tag) {
      throw new AppError('Tag não encontrada.');
    }
    return tag;
  }
}

module.exports = ListTagByIdUseCase;
