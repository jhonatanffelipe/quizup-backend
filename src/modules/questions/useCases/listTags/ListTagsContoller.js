const ListTagsUseCase = require('./ListTagsUseCase');

class ListTagsContoller {
  async handle(request, response) {
    const listTagsUseCase = new ListTagsUseCase();

    const { categoryId } = request.params;

    const topics = await listTagsUseCase.execute(categoryId);

    return response.status(200).json(topics);
  }
}

module.exports = ListTagsContoller;
