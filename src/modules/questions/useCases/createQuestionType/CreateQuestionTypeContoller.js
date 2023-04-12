const CreateQuestionTypeUseCase = require('./CreateQuestionTypeUseCase');

class CreateCategoryController {
  async handle(request, response) {
    const createQuestionTypeUseCase = new CreateQuestionTypeUseCase();

    const { code, title, description, isActive } = request.body;

    await createQuestionTypeUseCase.execute({ code, title, description, isActive });

    return response.status(201).send();
  }
}

module.exports = CreateCategoryController;
