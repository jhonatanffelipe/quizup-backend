const ListUserByIdUseCase = require('./ListUserByIdUseCase');

class ListUserByIdController {
  async handle(request, response) {
    const listUserByIdUseCase = new ListUserByIdUseCase();
    const { id } = request.params;
    const user = await listUserByIdUseCase.excute(id);

    return response.json(user);
  }
}

module.exports = ListUserByIdController;
