const AppError = require('../../../../shared/infra/http/errors/AppError');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class DeleteTopicUseCase {
  currentSequence;

  constructor() {
    this.topicsRepository = new TopicsRepository();
  }

  async execute(id) {
    const existsTopic = await this.topicsRepository.findById(id);

    if (!existsTopic) {
      throw new AppError('Tópico não encontrada.');
    }

    await this.topicsRepository.delete(id);

    const nextTopics = await this.topicsRepository.findNextTopics({
      sequence: existsTopic.sequence,
      categoryId: existsTopic.categoryId,
    });

    const topicsToUpdate = nextTopics
      .filter(topc => topc.id !== id)
      .sort((a, b) => {
        if (a.sequence > b.sequence) {
          return 1;
        }
        if (a.sequence < b.sequence) {
          return -1;
        }
        return 0;
      });

    this.currentSequence = existsTopic.sequence;

    for await (const currentTopic of topicsToUpdate) {
      await this.topicsRepository.update({ id: currentTopic.id, sequence: this.currentSequence });
      this.currentSequence += 1;
    }
  }
}

module.exports = DeleteTopicUseCase;
