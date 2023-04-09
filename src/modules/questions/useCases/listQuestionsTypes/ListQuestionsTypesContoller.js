const ListQuestionsTypesUseCase = require('./ListQuestionsTypesUseCase');

class ListQuestionsTypesContoller {
  async handle(request, response) {
    const { page, perPage, title } = request.query;

    const listQuestionsTypesUseCase = new ListQuestionsTypesUseCase();

    const questionsTypes = await listQuestionsTypesUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
      title,
    });

    return response.json(questionsTypes);
  }
}

module.exports = ListQuestionsTypesContoller;
