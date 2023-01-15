const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class ListTagsUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
  }

  async execute() {
    const tags = await this.tagsRepository.find();
    return tags;
  }
}

module.exports = ListTagsUseCase;
