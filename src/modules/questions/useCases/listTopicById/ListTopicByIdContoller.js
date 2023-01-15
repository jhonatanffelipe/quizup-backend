const ListTopicByIdUseCase = require('./ListTopicByIdUseCase');

class ListTopicByIdController {
  async handle(request, response) {
    const { id } = request.params;
    const listTopicByIdUseCase = new ListTopicByIdUseCase();

    const topic = await listTopicByIdUseCase.execute(id);

    return response.status(200).json(topic);
  }
}

module.exports = ListTopicByIdController;
