const UpdateImageCategoryUseCase = require('./UpdateImageCategoryUseCase');

class UpdateImageCategoryController {
  async handle(request, response) {
    const { id } = request.params;
    const imageFile = request.file?.filename || '';

    const updateImageCategoryUseCase = new UpdateImageCategoryUseCase();

    await updateImageCategoryUseCase.execute({ categoryId: id, imageFile });

    return response.send();
  }
}

module.exports = UpdateImageCategoryController;
