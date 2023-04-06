const TagsRepository = require('../../infra/knex/repositories/TagsRepository');

class ListTagsUseCase {
  constructor() {
    this.tagsRepository = new TagsRepository();
  }

  async execute({ page, perPage }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    const data = await this.tagsRepository.find({ page, perPage });

    const response = {
      perPage,
      currentPage: page,
      totalRows: data.count,
      data: data.tags,
    };

    return response;
  }
}

module.exports = ListTagsUseCase;
