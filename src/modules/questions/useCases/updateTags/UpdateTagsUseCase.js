const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class UpdateTagsUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ id, description, isActive }) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const categoryAlreadExists = await this.tagsRepository.findById(id);

    if (!categoryAlreadExists) {
      throw new AppError('Categoria não encontrada', 400);
    }

    const descriptionAlreadExists = await this.tagsRepository.findByDescription(description);

    if (descriptionAlreadExists && descriptionAlreadExists.id !== id) {
      throw new AppError('Já existe uma tag cadastrada com essa descrição', 400);
    }

    await this.tagsRepository.update({ id, description, isActive });
  }
}

module.exports = UpdateTagsUseCase;
