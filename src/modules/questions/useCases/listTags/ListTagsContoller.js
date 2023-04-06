const ListTagsUseCase = require('./ListTagsUseCase');

class ListTagsContoller {
  async handle(request, response) {
    const listTagsUseCase = new ListTagsUseCase();
    const { page, perPage } = request.query;

    const subjects = await listTagsUseCase.execute({ page, perPage });

    return response.status(200).json(subjects);
  }
}

module.exports = ListTagsContoller;
