const AppError = require('../../../../shared/infra/http/errors/AppError');
const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class CreateTagUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
  }

  async execute({ description }) {
    const tagAlreadExist = await this.tagsRepository.findByDescription({ description });

    if (tagAlreadExist) {
      throw new AppError('Já existe uma tag cadastrado com esse descrição.');
    }

    await this.tagsRepository.create(description);
  }
}

module.exports = CreateTagUseCase;
