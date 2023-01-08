const DeleteCategoryUseCase = require('./DeleteCategoryUseCase');

class DeleteCategoryController {
  async handle(request, response) {
    const deleteCategoryUseCase = new DeleteCategoryUseCase();

    const { id } = request.params;

    await deleteCategoryUseCase.execute(id);

    return response.send();
  }
}

module.exports = DeleteCategoryController;
