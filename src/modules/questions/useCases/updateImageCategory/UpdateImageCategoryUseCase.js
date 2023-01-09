const AppError = require('../../../../shared/infra/http/errors/AppError');
const LocalStorageProvider = require('../../../../shared/providers/StorageProvider/LocalStorageProvider');
const CategoriesRepository = require('../../infra/knex/repositories/CategoriesRepository');

class UpdateImageCategoryUseCase {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.storageProvider = new LocalStorageProvider();
  }

  async execute({ categoryId, imageFile }) {
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

module.exports = UpdateImageCategoryUseCase;
