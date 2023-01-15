const UpdateTopicImageUseCase = require('./UpdateTopicImageUseCase');

class UpdateTopicImageController {
  async handle(request, response) {
    const { id } = request.params;
    const imageFile = request.file?.filename || '';

    const updateTopicImageUseCase = new UpdateTopicImageUseCase();

    await updateTopicImageUseCase.execute({ topicId: id, imageFile });

    return response.send();
  }
}

module.exports = UpdateTopicImageController;
