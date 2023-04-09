const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class DeleteSubjectUseCase {
  currentSequence;

  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const existsSubject = await this.subjectsRepository.findById(id);

    if (!existsSubject) {
      throw new AppError('Assunto não encontrada.');
    }

    await this.subjectsRepository.delete(id);
  }
}

module.exports = DeleteSubjectUseCase;
