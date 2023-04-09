const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const QuestionsTypesRepository = require('../../infra/knex/repositories/QuestionsTypesRepository');

class ListQuestionTypeByIdUseCase {
  constructor() {
    this.questionsTypesRepository = new QuestionsTypesRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const questionType = await this.questionsTypesRepository.findById(id);

    if (!questionType) {
      throw new AppError('Tipo de questão não encontrada.');
    }

    return questionType;
  }
}

module.exports = ListQuestionTypeByIdUseCase;
