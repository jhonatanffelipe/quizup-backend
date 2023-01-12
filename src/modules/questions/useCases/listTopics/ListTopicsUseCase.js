const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class ListTopicsUseCase {
  constructor() {
    this.topicsRepository = new TopicsRepository();
  }

  async execute(categoryId) {
    const topics = await this.topicsRepository.find(categoryId);
    return topics.map(topic => {
      topic.image = topic.image && `${process.env.BACKEND_APP_URL}/topic/${topic.image}`;
      return topic;
    });
  }
}

module.exports = ListTopicsUseCase;
