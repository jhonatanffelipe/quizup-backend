const UpdateQuestionTypeUseCase = require('./UpdateQuestionTypeUseCase');

class UpdateQuestionTypeController {
  async handle(request, response) {
    const updateQuestionTypeUseCase = new UpdateQuestionTypeUseCase();

    const { id } = request.params;
    const { code, title, description } = request.body;

    await updateQuestionTypeUseCase.execute({ id, code, title, description });

    return response.send();
  }
}

module.exports = UpdateQuestionTypeController;
