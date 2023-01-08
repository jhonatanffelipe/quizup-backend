const UpdateCategoryService = require('./UpdateCategoryService');

class UpdateCategoryController {
  async handle(request, response) {
    const updateCategoryService = new UpdateCategoryService();

    const { id } = request.params;
    const { description } = request.body;

    await updateCategoryService.execute(id, description);

    return response.send();
  }
}

module.exports = UpdateCategoryController;
