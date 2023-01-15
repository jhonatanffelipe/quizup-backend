const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class ListTopicByIdUseCase {
  constructor() {
    this.topicsRepository = new TopicsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Tópico inválido.');
    }

    const topic = await this.topicsRepository.findById(id);
    topic.image = topic.image && `${process.env.BACKEND_APP_URL}/topic/${topic.image}`;
    return topic;
  }
}

module.exports = ListTopicByIdUseCase;
