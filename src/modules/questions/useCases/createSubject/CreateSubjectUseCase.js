const AppError = require('../../../../shared/infra/http/errors/AppError');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class CreateSubjectUseCase {
  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.categoriesRepository = new CategoriesRepository();
    this.tokenProvider = new UuidProvider();
  }

  async execute({ previousSubjectId, description, categoryId }) {
    if (!this.tokenProvider.validate(categoryId)) {
      throw new AppError('Categoria inválida');
    }

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Categoria inválida');
    }

    const subjectAlreadExist = await this.subjectsRepository.findByDescription({ description, categoryId });

    if (subjectAlreadExist) {
      throw new AppError('Já existe um assunto cadastrado com esse descrição.');
    }

    const previousSubject =
      this.tokenProvider.validate(previousSubjectId) && (await this.subjectsRepository.findById(previousSubjectId));

    const currentSequence = previousSubject ? previousSubject.sequence + 1 : 1;

    const nextSubjects = await this.subjectsRepository.findNextSubjects({ sequence: currentSequence, categoryId });

    if (nextSubjects.length > 0) {
      for await (const subject of nextSubjects) {
        subject.sequence += 1;
        await this.subjectsRepository.update(subject);
      }
    }

    await this.subjectsRepository.create({ sequence: currentSequence, description, categoryId });
  }
}

module.exports = CreateSubjectUseCase;
