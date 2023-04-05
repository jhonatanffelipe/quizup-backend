const CreateSubjectUseCase = require('./CreateSubjectUseCase');

class CreateSubjectController {
  async handle(request, response) {
    const createSubjectUseCase = new CreateSubjectUseCase();

    const { previousSubjectId, description, categoryId } = request.body;

    await createSubjectUseCase.execute({ previousSubjectId, description, categoryId });

    return response.status(201).send();
  }
}

module.exports = CreateSubjectController;
