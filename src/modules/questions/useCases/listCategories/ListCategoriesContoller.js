const ListCategoriesUseCase = require('./ListCategoriesUseCase');

class ListCategoriesController {
  async handle(request, response) {
    const { page, perPage, description } = request.query;

    const listCategoriesUseCase = new ListCategoriesUseCase();

    const categories = await listCategoriesUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
      description,
    });

    return response.json(categories);
  }
}

module.exports = ListCategoriesController;
