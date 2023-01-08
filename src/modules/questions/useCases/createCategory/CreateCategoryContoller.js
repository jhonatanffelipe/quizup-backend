const CreateCategoryUseCase = require('./CreateCategoryUseCase');

class CreateCategoryController {
  async handle(request, response) {
    const createCategoryUseCase = new CreateCategoryUseCase();

    const { description } = request.body;

    await createCategoryUseCase.execute(description);

    return response.status(201).send();
  }
}

module.exports = CreateCategoryController;
