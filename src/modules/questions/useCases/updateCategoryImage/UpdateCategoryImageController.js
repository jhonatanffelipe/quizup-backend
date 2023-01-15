const UpdateCategoryImageUseCase = require('./UpdateCategoryImageUseCase');

class UpdateCategoryImageController {
  async handle(request, response) {
    const { id } = request.params;
    const imageFile = request.file?.filename || '';

    const updateImageCategoryUseCase = new UpdateCategoryImageUseCase();

    await updateImageCategoryUseCase.execute({ categoryId: id, imageFile });

    return response.send();
  }
}

module.exports = UpdateCategoryImageController;
