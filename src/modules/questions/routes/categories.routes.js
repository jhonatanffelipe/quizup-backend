const { Router } = require('express');

const CategoryController = require('../controllers/CategoryController');

const categoriesRoutes = Router();

categoriesRoutes.get('/', CategoryController.index);
categoriesRoutes.post('/', CategoryController.create);
categoriesRoutes.put('/:id', CategoryController.update);
categoriesRoutes.delete('/:id', CategoryController.delete);

module.exports = categoriesRoutes;
