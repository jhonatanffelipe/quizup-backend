const CreateQuestionTypeUseCase = require('./CreateQuestionTypeUseCase');

class CreateCategoryController {
  async handle(request, response) {
    const createQuestionTypeUseCase = new CreateQuestionTypeUseCase();

    const { code, title, description } = request.body;

    await createQuestionTypeUseCase.execute({ code, title, description });

    return response.status(201).send();
  }
}

module.exports = CreateCategoryController;
