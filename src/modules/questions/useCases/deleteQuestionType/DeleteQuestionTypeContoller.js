const DeleteQuestionTypeUseCase = require('./DeleteQuestionTypeUseCase');

class DeleteQuestionTypeController {
  async handle(request, response) {
    const deleteQuestionTypeUseCase = new DeleteQuestionTypeUseCase();

    const { id } = request.params;

    await deleteQuestionTypeUseCase.execute(id);

    return response.send();
  }
}

module.exports = DeleteQuestionTypeController;
