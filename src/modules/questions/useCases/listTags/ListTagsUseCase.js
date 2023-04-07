const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class ListTagsUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
  }

  async execute({ page, perPage }) {
    const response = await this.tagsRepository.find({ page, perPage });
    return response;
  }
}

module.exports = ListTagsUseCase;
