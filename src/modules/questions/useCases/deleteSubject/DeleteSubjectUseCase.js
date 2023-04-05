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

    const nextSubjects = await this.subjectsRepository.findNextSubjects({
      sequence: existsSubject.sequence,
      categoryId: existsSubject.categoryId,
    });

    const subjectToUpdate = nextSubjects
      .filter(subject => subject.id !== id)
      .sort((a, b) => {
        if (a.sequence > b.sequence) {
          return 1;
        }
        if (a.sequence < b.sequence) {
          return -1;
        }
        return 0;
      });

    this.currentSequence = existsSubject.sequence;

    for await (const currentSubject of subjectToUpdate) {
      await this.subjectsRepository.update({ id: currentSubject.id, sequence: this.currentSequence });
      this.currentSequence += 1;
    }
  }
}

module.exports = DeleteSubjectUseCase;
