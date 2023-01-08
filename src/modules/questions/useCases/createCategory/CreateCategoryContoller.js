const CreateCategoryService = require('./CreateCategoryService');

class CreateCategoryController {
  async handle(request, response) {
    const createCategoryService = new CreateCategoryService();

    const { description } = request.body;

    await createCategoryService.execute(description);

    return response.status(201).send();
  }
}

module.exports = CreateCategoryController;
