const DeleteSubjectUseCase = require('./DeleteSubjectUseCase');

class DeleteSubjectController {
  async handle(request, response) {
    const deleteSubjectUseCase = new DeleteSubjectUseCase();

    const { id } = request.params;

    await deleteSubjectUseCase.execute(id);

    return response.send();
  }
}

module.exports = DeleteSubjectController;
