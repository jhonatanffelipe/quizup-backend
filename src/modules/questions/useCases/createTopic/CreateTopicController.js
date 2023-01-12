const CreateTopicUseCase = require('./CreateTopicUseCase');

class CreateTopicController {
  async handle(request, response) {
    const createTopicUseCase = new CreateTopicUseCase();

    const { previousTopicId, description, categoryId } = request.body;

    await createTopicUseCase.execute({ previousTopicId, description, categoryId });

    return response.status(201).send();
  }
}

module.exports = CreateTopicController;
