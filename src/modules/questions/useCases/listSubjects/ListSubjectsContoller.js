const ListSubjectsUseCase = require('./ListSubjectsUseCase');

class ListSubjectsContoller {
  async handle(request, response) {
    const listSubjectsUseCase = new ListSubjectsUseCase();

    const { categoryId } = request.params;

    const subjects = await listSubjectsUseCase.execute(categoryId);

    return response.status(200).json(subjects);
  }
}

module.exports = ListSubjectsContoller;
