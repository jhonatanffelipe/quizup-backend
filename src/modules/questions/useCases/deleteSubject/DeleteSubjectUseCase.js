const AppError = require('../../../../shared/infra/http/errors/AppError');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class DeleteSubjectUseCase {
  currentSequence;

  constructor() {
    this.subjectsRepository = new SubjectsRepository();
  }

  async execute(id) {
    const existsSubject = await this.subjectsRepository.findById(id);

    if (!existsSubject) {
      throw new AppError('Assunto não encontrada.');
    }

    await this.subjectsRepository.delete(id);
  }
}

module.exports = DeleteSubjectUseCase;
