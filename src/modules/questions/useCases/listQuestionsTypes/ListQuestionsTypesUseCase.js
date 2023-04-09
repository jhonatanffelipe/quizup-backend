const QuestionsTypesRepository = require('../../infra/knex/repositories/QuestionsTypesRepository');

class ListQuestionsTypesUseCase {
  constructor() {
    this.questionsTypesRepository = new QuestionsTypesRepository();
  }

  async execute({ page, perPage, title }) {
    const response = await this.questionsTypesRepository.find({ page, perPage, title });
    return response;
  }
}

module.exports = ListQuestionsTypesUseCase;
