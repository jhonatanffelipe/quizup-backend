const { Router } = require('express');

const CreateCategoryController = require('../useCases/createCategory/CreateCategoryContoller');
const DeleteCategoryController = require('../useCases/deleteCategory/DeleteCategoryContoller');
const ListCategoriesController = require('../useCases/listCategories/ListCategoriesContoller');
const UpdateCategoryController = require('../useCases/updateCategory/UpdateCategoryContoller');

const categoriesRoutes = Router();

const categoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', categoryController.handle);
categoriesRoutes.put('/:id', updateCategoryController.handle);
categoriesRoutes.delete('/:id', deleteCategoryController.handle);

module.exports = categoriesRoutes;
