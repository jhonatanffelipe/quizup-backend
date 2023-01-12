const AppError = require('../../../../shared/infra/http/errors/AppError');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class CreateTopicUseCase {
  constructor() {
    this.topicsRepository = new TopicsRepository();
    this.categoriesRepository = new CategoriesRepository();
    this.tokenProvider = new UuidProvider();
  }

  async execute({ previousTopicId, description, categoryId }) {
    if (!this.tokenProvider.validate(categoryId)) {
      throw new AppError('Categoria inválida');
    }

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Categoria inválida');
    }

    const topicAlreadExist = await this.topicsRepository.findByDescription({ description, categoryId });

    if (topicAlreadExist) {
      throw new AppError('Já existe um tópico cadastrado com esse descrição.');
    }

    const previousTopic =
      this.tokenProvider.validate(previousTopicId) &&
      (await this.topicsRepository.findById({ id: previousTopicId, categoryId }));

    const currentSequence = previousTopic ? previousTopic.sequence + 1 : 1;

    const nextTopics = await this.topicsRepository.findNextTopcs({ sequence: currentSequence, categoryId });

    if (nextTopics.length > 0) {
      for await (const topic of nextTopics) {
        topic.sequence += 1;
        await this.topicsRepository.update(topic);
      }
    }

    await this.topicsRepository.create({ sequence: currentSequence, description, categoryId });
  }
}

module.exports = CreateTopicUseCase;
