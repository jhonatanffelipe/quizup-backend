const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class ListSubjectsUseCase {
  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ categoryId, page, perPage, description }) {
    if (!this.uuidProvider.validate(categoryId)) {
      throw new AppError('Categoria inválida.');
    }

    const response = await this.subjectsRepository.findAllByCategoryId({ categoryId, page, perPage, description });

    response.data = response.data.map(subject => {
      subject.image = subject.image && `${process.env.BACKEND_APP_URL}/subject/${subject.image}`;
      return subject;
    });

    return response;
  }
}

module.exports = ListSubjectsUseCase;
