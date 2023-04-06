const DeleteTagUseCase = require('./DeleteTagUseCase');

class DeleteTagController {
  async handle(request, response) {
    const deleteTagUseCase = new DeleteTagUseCase();

    const { id } = request.params;

    await deleteTagUseCase.execute(id);

    return response.send();
  }
}

module.exports = DeleteTagController;
