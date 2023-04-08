const UpdateSubjectSequenceUseCase = require('./UpdatePreviousSubjectUseCase');

class UpdatePreviousSubjectController {
  async handle(request, response) {
    const updateSubjectSequenceUseCase = new UpdateSubjectSequenceUseCase();

    const { id } = request.params;
    const { previousSubjectId } = request.body;

    await updateSubjectSequenceUseCase.execute({ id, previousSubjectId });

    return response.send();
  }
}

module.exports = UpdatePreviousSubjectController;
