const DeleteCategoryService = require('./DeleteCategoryService');

class DeleteCategoryController {
  async handle(request, response) {
    const deleteCategoryService = new DeleteCategoryService();

    const { id } = request.params;

    await deleteCategoryService.execute(id);

    return response.send();
  }
}

module.exports = DeleteCategoryController;
