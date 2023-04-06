const ListTagByIdUseCase = require('./ListTagByIdUseCase');

class ListTagByIdController {
  async handle(request, response) {
    const { id } = request.params;
    const listTagByIdUseCase = new ListTagByIdUseCase();

    const subject = await listTagByIdUseCase.execute(id);

    return response.status(200).json(subject);
  }
}

module.exports = ListTagByIdController;
