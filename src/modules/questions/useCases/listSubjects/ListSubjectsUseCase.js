const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class ListSubjectsUseCase {
  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute(categoryId) {
    if (!this.uuidProvider.validate(categoryId)) {
      throw new AppError('Categoria inválida.');
    }

    const subjects = await this.subjectsRepository.findAllByCategoryId(categoryId);
    return subjects.map(subject => {
      subject.image = subject.image && `${process.env.BACKEND_APP_URL}/subject/${subject.image}`;
      return subject;
    });
  }
}

module.exports = ListSubjectsUseCase;
