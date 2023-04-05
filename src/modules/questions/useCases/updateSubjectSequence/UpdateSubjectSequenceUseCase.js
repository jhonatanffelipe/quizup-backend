const AppError = require('../../../../shared/infra/http/errors/AppError');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class UpdateSubjectSequenceUseCase {
  currentSequence;

  constructor() {
    this.subjectsRepository = new SubjectsRepository();
  }

  async execute({ id, sequence }) {
    const subject = await this.subjectsRepository.findById(id);

    if (!subject) {
      throw new AppError('Assunto não encontrada', 400);
    }

    if (sequence < subject.sequence) {
      this.currentSequence = sequence;

      const nextSubjects = await this.subjectsRepository.findNextSubjects({
        sequence: this.currentSequence,
        categoryId: subject.categoryId,
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

      this.currentSequence = sequence + 1;

      for await (const currentSubject of subjectToUpdate) {
        await this.subjectsRepository.update({ id: currentSubject.id, sequence: this.currentSequence });
        this.currentSequence += 1;
      }
    } else {
      const subjectToUpdate = await this.subjectsRepository.findBetween({
        initalSequence: subject.sequence,
        finalSequence: sequence,
      });

      this.currentSequence = subject.sequence;
      for await (const currentSubject of subjectToUpdate) {
        await this.subjectsRepository.update({ id: currentSubject.id, sequence: this.currentSequence });
        this.currentSequence += 1;
      }
    }

    await this.subjectsRepository.update({ id, sequence });
  }
}

module.exports = UpdateSubjectSequenceUseCase;
