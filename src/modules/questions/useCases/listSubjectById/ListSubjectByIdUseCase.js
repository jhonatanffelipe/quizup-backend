const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class ListSubjectByIdUseCase {
  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(id) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Assunto inválido.');
    }

    const subject = await this.subjectsRepository.findById(id);

    if (!subject) {
      throw new AppError('Assunto não encontrado.');
    }

    const previousSubject = await this.subjectsRepository.findById(
      subject?.previousSubjectId ? subject?.previousSubjectId : null,
    );

    subject.image = subject.image && `${process.env.BACKEND_APP_URL}/subject/${subject.image}`;
    subject.previousSubject = previousSubject;
    return subject;
  }
}

module.exports = ListSubjectByIdUseCase;
