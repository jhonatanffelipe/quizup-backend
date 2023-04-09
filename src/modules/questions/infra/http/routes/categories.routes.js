const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../../../../../config/upload');
const ensureAuthenticated = require('../../../../users/infra/http/middlewares/esureAuthenticated');
const CreateCategoryController = require('../../../useCases/createCategory/CreateCategoryContoller');
const DeleteCategoryController = require('../../../useCases/deleteCategory/DeleteCategoryContoller');
const ListCategoriesController = require('../../../useCases/listCategories/ListCategoriesContoller');
const ListCategoryByIdContoller = require('../../../useCases/listCategoryById/ListCategoryByIdContoller');
const UpdateCategoryController = require('../../../useCases/updateCategory/UpdateCategoryContoller');
const UpdateCategoryImageController = require('../../../useCases/updateCategoryImage/UpdateCategoryImageController');

const categoriesRoutes = Router();

const uploadImage = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const updateImageCategoryController = new UpdateCategoryImageController();
const listCategoryByIdContoller = new ListCategoryByIdContoller();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.put('/:id', updateCategoryController.handle);
categoriesRoutes.delete('/:id', deleteCategoryController.handle);
categoriesRoutes.patch('/image/:id', uploadImage.single('image'), updateImageCategoryController.handle);
categoriesRoutes.get('/:id', listCategoryByIdContoller.handle);

module.exports = categoriesRoutes;
