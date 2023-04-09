const ListQuestionTypeByIdUseCase = require('./ListQuestionTypeByIdUseCase');

class ListQuestionTypeByIdContoller {
  async handle(request, response) {
    const { id } = request.params;
    const listQuestionTypeByIdUseCase = new ListQuestionTypeByIdUseCase();

    const questionType = await listQuestionTypeByIdUseCase.execute(id);

    return response.status(200).json(questionType);
  }
}

module.exports = ListQuestionTypeByIdContoller;
