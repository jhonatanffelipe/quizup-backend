const { Router } = require('express');
const knex = require('../config/db');

const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
  knex('categories').then((categories) => response.json(categories));
});

module.exports = categoriesRoutes;
