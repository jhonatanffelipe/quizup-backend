const UpdateSubjectSequenceUseCase = require('./UpdateSubjectUseCase');

class UpdateSubjectController {
  async handle(request, response) {
    const updateSubjectSequenceUseCase = new UpdateSubjectSequenceUseCase();

    const { id } = request.params;
    const { previousSubjectId, description, isActive } = request.body;

    await updateSubjectSequenceUseCase.execute({ id, previousSubjectId, description, isActive });

    return response.send();
  }
}

module.exports = UpdateSubjectController;
