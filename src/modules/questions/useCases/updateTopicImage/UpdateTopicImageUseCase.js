const AppError = require('../../../../shared/infra/http/errors/AppError');
const LocalStorageProvider = require('../../../../shared/providers/StorageProvider/LocalStorageProvider');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class UpdateTopicImageUseCase {
  constructor() {
    this.topicsRepository = new TopicsRepository();
    this.storageProvider = new LocalStorageProvider();
  }

  async execute({ topicId, imageFile }) {
    const topic = await this.topicsRepository.findById(topicId);

    if (!topic) {
      throw new AppError('Tópico não encontrada.');
    }

    if (topic.image) {
      await this.storageProvider.delete(topic.image, 'topic');
    }

    await this.storageProvider.save(imageFile, 'topic');

    topic.image = imageFile;

    await this.topicsRepository.update({
      id: topicId,
      image: imageFile,
    });
  }
}

module.exports = UpdateTopicImageUseCase;
