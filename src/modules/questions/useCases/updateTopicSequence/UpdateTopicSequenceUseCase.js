const AppError = require('../../../../shared/infra/http/errors/AppError');
const TopicsRepository = require('../../infra/knex/repositories/TopicsRepository');

class UpdateTopicSequenceUseCase {
  currentSequence;

  constructor() {
    this.topícsRepository = new TopicsRepository();
  }

  async execute({ id, sequence }) {
    const topic = await this.topícsRepository.findById(id);

    if (!topic) {
      throw new AppError('Tópico não encontrada', 400);
    }

    if (sequence < topic.sequence) {
      this.currentSequence = sequence;

      const nextTopics = await this.topícsRepository.findNextTopics({
        sequence: this.currentSequence,
        categoryId: topic.categoryId,
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

      this.currentSequence = sequence + 1;

      for await (const currentTopic of topicsToUpdate) {
        await this.topícsRepository.update({ id: currentTopic.id, sequence: this.currentSequence });
        this.currentSequence += 1;
      }
    } else {
      const topicsToUpdate = await this.topícsRepository.findBetween({
        initalSequence: topic.sequence,
        finalSequence: sequence,
      });

      this.currentSequence = topic.sequence;
      for await (const currentTopic of topicsToUpdate) {
        await this.topícsRepository.update({ id: currentTopic.id, sequence: this.currentSequence });
        this.currentSequence += 1;
      }
    }

    await this.topícsRepository.update({ id, sequence });
  }
}

module.exports = UpdateTopicSequenceUseCase;
