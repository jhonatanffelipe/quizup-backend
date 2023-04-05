const UpdateCategoryUseCase = require('./UpdateCategoryUseCase');

class UpdateCategoryController {
  async handle(request, response) {
    const updateCategoryUseCase = new UpdateCategoryUseCase();

    const { id } = request.params;
    const { description, isActive } = request.body;

    await updateCategoryUseCase.execute({ id, description, isActive });

    return response.send();
  }
}

module.exports = UpdateCategoryController;
