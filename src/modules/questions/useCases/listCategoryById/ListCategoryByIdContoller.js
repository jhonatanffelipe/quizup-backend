const ListCategoryByIdUseCase = require('./ListCategoryByIdUseCase');

class ListCategoriesController {
  async handle(request, response) {
    const { id } = request.params;
    const listCategoryByIdUseCase = new ListCategoryByIdUseCase();

    const category = await listCategoryByIdUseCase.execute(id);

    return response.status(200).json(category);
  }
}

module.exports = ListCategoriesController;
