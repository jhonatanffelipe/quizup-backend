const AppError = require('../../../../shared/infra/http/errors/AppError');
const QuestionsTypesRepository = require('../../infra/knex/repositories/QuestionsTypesRepository');

class CreateQuestionTypeUseCase {
  constructor() {
    this.questionsTypesRepository = new QuestionsTypesRepository();
  }

  async execute({ code, title, description }) {
    const titleAlreadExists = await this.questionsTypesRepository.findByTitle(title);

    if (titleAlreadExists) {
      throw new AppError('Já existe um tipo de questão cadastrado com esse titulo', 400);
    }

    const codeAlreadExists = await this.questionsTypesRepository.findByCode(code);

    if (codeAlreadExists) {
      throw new AppError('Já existe um tipo de questão cadastrado com esse código', 400);
    }

    await this.questionsTypesRepository.create({ code, title, description });
  }
}

module.exports = CreateQuestionTypeUseCase;
