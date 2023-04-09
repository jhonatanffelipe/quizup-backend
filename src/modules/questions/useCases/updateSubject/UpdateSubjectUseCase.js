const AppError = require('../../../../shared/infra/http/errors/AppError');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class UpdateSubjectUseCase {
  currentSubjectSequence;

  newPreviousSubjectSequence;

  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ id, previousSubjectId, description, isActive }) {
    if (!this.uuidProvider.validate(id)) {
      throw new AppError('Id informado é inválido');
    }

    const subject = await this.subjectsRepository.findById(id);

    if (!subject) {
      throw new AppError('Assunto não encontrado', 400);
    }

    if (subject?.previousSubjectId === previousSubjectId) {
      await this.subjectsRepository.update({
        id,
        description,
        isActive,
        sequence: previousSubjectId === null ? 1 : subject.sequence,
      });
    } else {
      const previousSubject = await this.subjectsRepository.findById(previousSubjectId);

      if (!previousSubject && previousSubjectId !== null) {
        throw new AppError('Assunto anterior não encontrado', 400);
      }

      this.currentSubjectSequence = subject?.sequence;
      this.newPreviousSubjectSequence = previousSubject?.sequence || null;

      if (this.currentSubjectSequence > this.newPreviousSubjectSequence || previousSubjectId === null) {
        const nextSubject = await this.subjectsRepository.findByPreviousSubjectId({
          previousSubjectId: subject.id,
          categoryId: subject.categoryId,
        });

        if (nextSubject) {
          Object.assign(nextSubject, { previousSubjectId: subject.previousSubjectId });

          await this.subjectsRepository.update(nextSubject);
        }

        const subjectToUpdate = await this.subjectsRepository.findBetween({
          initalSequence: this.newPreviousSubjectSequence || 0,
          finalSequence: this.currentSubjectSequence,
          categoryId: subject.categoryId,
        });

        await this.subjectsRepository.update({
          id,
          previousSubjectId,
          sequence: previousSubjectId === null ? 1 : this.newPreviousSubjectSequence + 1,
          description,
          isActive,
        });

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
        const nextSubject = await this.subjectsRepository.findByPreviousSubjectId({
          previousSubjectId: previousSubject.id,
          categoryId: subject.categoryId,
        });

        if (nextSubject) {
          Object.assign(nextSubject, { previousSubjectId: subject.id });

          await this.subjectsRepository.update(nextSubject);
        }

        const subjectToUpdate = await this.subjectsRepository.findBetween({
          initalSequence: this.currentSubjectSequence || 0,
          finalSequence: this.newPreviousSubjectSequence + 1,
          categoryId: subject.categoryId,
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
            previousSubjectId: subject?.previousSubjectId || null,
          });
        }

        await this.subjectsRepository.update({
          id,
          previousSubjectId,
          sequence: this.newPreviousSubjectSequence,
          description,
          isActive,
        });
      }
    }
  }
}

module.exports = UpdateSubjectUseCase;
