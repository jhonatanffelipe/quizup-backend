const DeleteTopicUseCase = require('./DeleteTopicUseCase');

class DeleteTopicController {
  async handle(request, response) {
    const deleteTopicUseCase = new DeleteTopicUseCase();

    const { id } = request.params;

    await deleteTopicUseCase.execute(id);

    return response.send();
  }
}

module.exports = DeleteTopicController;
