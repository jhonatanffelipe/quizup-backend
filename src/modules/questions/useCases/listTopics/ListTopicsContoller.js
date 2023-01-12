const ListTopicsUseCase = require('./ListTopicsUseCase');

class ListTopicsContoller {
  async handle(request, response) {
    const listTopicsUseCase = new ListTopicsUseCase();

    const { categoryId } = request.params;

    const topics = await listTopicsUseCase.execute(categoryId);

    return response.status(200).json(topics);
  }
}

module.exports = ListTopicsContoller;
