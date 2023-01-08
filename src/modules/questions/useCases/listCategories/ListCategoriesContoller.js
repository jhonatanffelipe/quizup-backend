const ListCategoriesService = require('./ListCategoriesService');

class ListCategoriesController {
  async handle(request, response) {
    const listCategoriesService = new ListCategoriesService();

    const categories = await listCategoriesService.execute();

    return response.status(200).json(categories);
  }
}

module.exports = ListCategoriesController;
