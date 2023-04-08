const AppError = require('../../../../shared/infra/http/errors/AppError');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class UpdatePreviousSubjectUseCase {
  currentSubjectSequence;

  newPreviousSubjectSequence;

  constructor() {
    this.subjectsRepository = new SubjectsRepository();
  }

  async execute({ id, previousSubjectId }) {
    const subject = await this.subjectsRepository.findById(id);

    if (!subject) {
      throw new AppError('Assunto não encontrado', 400);
    }

    const previousSubject = await this.subjectsRepository.findById(previousSubjectId);

    if (!previousSubject && previousSubjectId !== null) {
      throw new AppError('Assunto anterior não encontrado', 400);
    }

    this.currentSubjectSequence = subject.sequence;
    this.newPreviousSubjectSequence = previousSubject?.sequence || null;

    if (this.currentSubjectSequence > this.newPreviousSubjectSequence || previousSubjectId === null) {
      const subjectToUpdate = await this.subjectsRepository.findBetween({
        initalSequence: this.newPreviousSubjectSequence || 0,
        finalSequence: this.currentSubjectSequence,
      });
      await this.subjectsRepository.update({ id, previousSubjectId, sequence: this.newPreviousSubjectSequence + 1 });
      if (subjectToUpdate.length > 0) {
        for await (const currentSubject of subjectToUpdate) {
          await this.subjectsRepository.update({ id: currentSubject.id, sequence: currentSubject.sequence + 1 });
        }
        await this.subjectsRepository.update({
          id: subjectToUpdate[0].id,
          previousSubjectId: id,
        });
      }
    } else {
      if (subject.previousSubjectId === null) {
        const nextSubject = await this.subjectsRepository.findByPreviousSubjectId(previousSubjectId);

        nextSubject.previousSubjectId = id;

        await this.subjectsRepository.update(nextSubject);
      }

      const subjectToUpdate = await this.subjectsRepository.findBetween({
        initalSequence: this.currentSubjectSequence || 0,
        finalSequence: this.newPreviousSubjectSequence + 1,
      });
      if (subjectToUpdate.length > 0) {
        for await (const currentSubject of subjectToUpdate) {
          await this.subjectsRepository.update({
            id: currentSubject.id,
            sequence: currentSubject.sequence - 1,
          });
        }
        await this.subjectsRepository.update({
          id: subjectToUpdate[0].id,
          previousSubjectId: subject.previousSubjectId,
        });
      }

      await this.subjectsRepository.update({
        id,
        previousSubjectId,
        sequence: this.newPreviousSubjectSequence,
      });
    }
  }
}

module.exports = UpdatePreviousSubjectUseCase;
