const AppError = require('../../../../shared/infra/http/errors/AppError');
const LocalStorageProvider = require('../../../../shared/providers/StorageProvider/LocalStorageProvider');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const SubjectsRepository = require('../../infra/knex/repositories/SubjectsRepository');

class UpdateSubjectImageUseCase {
  constructor() {
    this.subjectsRepository = new SubjectsRepository();
    this.storageProvider = new LocalStorageProvider();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ subjectId, imageFile }) {
    if (!this.uuidProvider.validate(subjectId)) {
      throw new AppError('Id informado é inválido');
    }

    const subject = await this.subjectsRepository.findById(subjectId);

    if (!subject) {
      throw new AppError('Assunto não encontrada.');
    }

    if (subject.image) {
      await this.storageProvider.delete(subject.image, 'subject');
    }

    await this.storageProvider.save(imageFile, 'subject');

    subject.image = imageFile;

    await this.subjectsRepository.update({
      id: subjectId,
      image: imageFile,
    });
  }
}

module.exports = UpdateSubjectImageUseCase;
