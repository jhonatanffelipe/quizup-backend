const UpdateTagsUseCase = require('./UpdateTagsUseCase');

class UpdateTagsController {
  async handle(request, response) {
    const updateTagsUseCase = new UpdateTagsUseCase();

    const { id } = request.params;
    const { description, isActive } = request.body;

    await updateTagsUseCase.execute({ id, description, isActive });

    return response.send();
  }
}

module.exports = UpdateTagsController;
