const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
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
    subject.image = subject.image && `${process.env.BACKEND_APP_URL}/subject/${subject.image}`;
    return subject;
  }
}

module.exports = ListSubjectByIdUseCase;
