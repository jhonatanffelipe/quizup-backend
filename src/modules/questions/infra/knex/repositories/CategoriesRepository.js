const knex = require('../../../../../config/db');

class CategoriesRepository {
  async create({ description }) {
    await knex('categories').insert({ description });
  }

  async find() {
    const categories = await knex('categories').orderBy('description');
    return categories;
  }

  async findById(id) {
    const category = await knex('categories').where({ id }).first();
    return category;
  }

  async findByDescription(description) {
    const category = await knex('categories').where({ description }).first();
    return category;
  }

  async update({ id, description, image }) {
    await knex('categories').where({ id }).update({ description, image });
  }

  async delete(id) {
    await knex('categories').where({ id }).del();
  }
}

module.exports = CategoriesRepository;
