const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class ListTopicsUseCase {
  constructor() {
    this.topicsRepository = new TopicsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(categoryId) {
    if (!this.uuidProvider.validate(categoryId)) {
      throw new AppError('Categoria inválida.');
    }

    const topics = await this.topicsRepository.findAllByCategoryId(categoryId);
    return topics.map(topic => {
      topic.image = topic.image && `${process.env.BACKEND_APP_URL}/topic/${topic.image}`;
      return topic;
    });
  }
}

module.exports = ListTopicsUseCase;
