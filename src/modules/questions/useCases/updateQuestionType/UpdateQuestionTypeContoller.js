const UpdateQuestionTypeUseCase = require('./UpdateQuestionTypeUseCase');

class UpdateQuestionTypeController {
  async handle(request, response) {
    const updateQuestionTypeUseCase = new UpdateQuestionTypeUseCase();

    const { id } = request.params;
    const { code, title, description, isActive } = request.body;

    await updateQuestionTypeUseCase.execute({ id, code, title, description, isActive });

    return response.send();
  }
}

module.exports = UpdateQuestionTypeController;
