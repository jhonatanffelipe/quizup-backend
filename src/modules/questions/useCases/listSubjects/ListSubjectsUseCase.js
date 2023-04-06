const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class ListSubjectsUseCase {
  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ page, perPage, categoryId }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    if (!this.uuidProvider.validate(categoryId)) {
      throw new AppError('Categoria inválida.');
    }

    const data = await this.subjectsRepository.findAllByCategoryId({ page, perPage, categoryId });

    const response = {
      perPage,
      currentPage: page,
      totalRows: data.count,
      data: data.subjects,
    };

    response.data = response.data.map(subject => {
      subject.image = subject.image && `${process.env.BACKEND_APP_URL}/subject/${subject.image}`;
      return subject;
    });

    return response;
  }
}

module.exports = ListSubjectsUseCase;
