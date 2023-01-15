const CreateTagUseCase = require('./CreateTagUseCase');

class CreateTagController {
  async handle(request, response) {
    const createTagUseCase = new CreateTagUseCase();

    const { description } = request.body;

    await createTagUseCase.execute({ description });

    return response.status(201).send();
  }
}

module.exports = CreateTagController;
