const ListCategoriesUseCase = require('./ListCategoriesUseCase');

class ListCategoriesController {
  async handle(request, response) {
    const listCategoriesUseCase = new ListCategoriesUseCase();

    const categories = await listCategoriesUseCase.execute();

    return response.status(200).json(categories);
  }
}

module.exports = ListCategoriesController;
