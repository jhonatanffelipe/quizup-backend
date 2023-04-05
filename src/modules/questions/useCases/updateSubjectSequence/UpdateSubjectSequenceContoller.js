const UpdateSubjectSequenceUseCase = require('./UpdateSubjectSequenceUseCase');

class UpdateSubjectSequenceController {
  async handle(request, response) {
    const updateSubjectSequenceUseCase = new UpdateSubjectSequenceUseCase();

    const { id } = request.params;
    const { sequence } = request.body;

    await updateSubjectSequenceUseCase.execute({ id, sequence });

    return response.send();
  }
}

module.exports = UpdateSubjectSequenceController;
