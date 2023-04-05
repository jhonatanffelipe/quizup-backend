const ListSubjectByIdUseCase = require('./ListSubjectByIdUseCase');

class ListSubjectByIdController {
  async handle(request, response) {
    const { id } = request.params;
    const listSubjectByIdUseCase = new ListSubjectByIdUseCase();

    const subject = await listSubjectByIdUseCase.execute(id);

    return response.status(200).json(subject);
  }
}

module.exports = ListSubjectByIdController;
