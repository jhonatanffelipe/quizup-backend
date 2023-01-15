const UpdateTopicSequenceUseCase = require('./UpdateTopicSequenceUseCase');

class UpdateTopicSequenceController {
  async handle(request, response) {
    const updateTopicSequenceUseCase = new UpdateTopicSequenceUseCase();

    const { id } = request.params;
    const { sequence } = request.body;

    await updateTopicSequenceUseCase.execute({ id, sequence });

    return response.send();
  }
}

module.exports = UpdateTopicSequenceController;
