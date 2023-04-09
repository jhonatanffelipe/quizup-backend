const AppError = require('../../../../shared/infra/http/errors/AppError');
const LocalStorageProvider = require('../../../../shared/providers/StorageProvider/LocalStorageProvider');
const UuidProvider = require('../../../../shared/providers/UuidProvider/UuidProvider');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class UpdateCategoryImageUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.storageProvider = new LocalStorageProvider();
    this.uuidProvider = new UuidProvider();
  }

  async execute({ categoryId, imageFile }) {
    if (!this.uuidProvider.validate(categoryId)) {
      throw new AppError('Id informado é inválido');
    }

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Categoria não encontrada.');
    }

    if (category.image) {
      await this.storageProvider.delete(category.image, 'category');
    }

    await this.storageProvider.save(imageFile, 'category');

    category.image = imageFile;

    await this.categoriesRepository.update({
      id: categoryId,
      image: imageFile,
    });
  }
}

module.exports = UpdateCategoryImageUseCase;
