const knex = require('../../../config/db');

module.exports = {
  async index(reqquest, response) {
    const categories = await knex('categories').orderBy('description');

    return response.status(200).json(categories);
  },

  async create(reqquest, response, next) {
    try {
      const { description } = reqquest.body;

      const descriptionAlreadExists = await knex('categories')
        .where({ description });

      if (descriptionAlreadExists.length > 0) {
        return response.status(400).json({ error: 'Já existe uma categoria cadastrada com essa descrição' });
      }

      await knex('categories').insert({ description });
    } catch (error) {
      next(error);
    }

    return response.status(201).send();
  },

  async update(reqquest, response, next) {
    try {
      const { id } = reqquest.params;
      const { description } = reqquest.body;

      const categoryAlreadExists = await knex('categories')
        .where({ id });

      if (categoryAlreadExists.length === 0) {
        return response.status(400).json({ error: 'Categoria não encontrada' });
      }

      const descriptionAlreadExists = await knex('categories')
        .where({ description });

      if (descriptionAlreadExists.some((category) => category.id !== id)) {
        return response.status(400).json({ error: 'Já existe uma categoria cadastrada com essa descrição' });
      }

      await knex('categories')
        .update({ description })
        .where({ id });

      return response.send();
    } catch (error) {
      next(error);
    }
  },

  async delete(reqquest, response, next) {
    try {
      const { id } = reqquest.params;

      const categoryAlreadExists = await knex('categories')
        .where({ id });

      if (!categoryAlreadExists.length === 0) {
        return response.status(400).json({ error: 'Categoria não encontrada' });
      }

      await knex('categories')
        .where({ id })
        .del();

      return response.send();
    } catch (error) {
      next(error);
    }
  },
};
