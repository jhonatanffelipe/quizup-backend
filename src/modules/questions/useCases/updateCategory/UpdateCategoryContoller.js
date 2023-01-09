const UpdateCategoryUseCase = require('./UpdateCategoryUseCase');

class UpdateCategoryController {
  async handle(request, response) {
    const updateCategoryUseCase = new UpdateCategoryUseCase();

    const { id } = request.params;
    const { description } = request.body;

    await updateCategoryUseCase.execute({ id, description });

    return response.send();
  }
}

module.exports = UpdateCategoryController;
