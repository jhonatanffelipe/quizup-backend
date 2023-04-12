const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const QuestionsTypesRepository = require('../../infra/knex/repositories/QuestionsTypesRepository');

class UpdateQuestionTypeUseCase {
  constructor() {
    this.questionsTypesRepository = new QuestionsTypesRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ id, code, title, description, isActive }) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const questionTypeAlreadExists = await this.questionsTypesRepository.findById(id);

    if (!questionTypeAlreadExists) {
      throw new AppError('Tipo de questão não encontrada', 400);
    }

    const titleAlreadExists = await this.questionsTypesRepository.findByTitle(title);

    if (titleAlreadExists && titleAlreadExists.id !== id) {
      throw new AppError('Já existe um tipo de questão cadastrado com esse titulo', 400);
    }

    const codeAlreadExists = await this.questionsTypesRepository.findByCode(code);

    if (codeAlreadExists && codeAlreadExists.id !== id) {
      throw new AppError('Já existe um tipo de questão cadastrado com esse código', 400);
    }

    await this.questionsTypesRepository.update({ id, code, title, description, isActive });
  }
}

module.exports = UpdateQuestionTypeUseCase;
