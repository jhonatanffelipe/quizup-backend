const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class CategoriesRepository {
  async create({ description, isActive }) {
    try {
      await knex('categories').insert({ description, isActive });
    } catch (error) {
      throw new AppError('Erro ao criar categoria. Por favor contate a equipe de suporte.');
    }
  }

  async find({ page, perPage, description }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    try {
      const categories = await knex('categories')
        .whereILike('description', `%${description}%`)
        .orderBy('description')
        .limit(perPage)
        .offset((page - 1) * perPage);

      const count = await knex('categories').whereILike('description', `%${description}%`).count();

      const response = {
        perPage: Number(perPage),
        currentPage: Number(page),
        totalRows: count[0]?.count > 0 ? Number(count[0].count) : 0,
        data: categories,
      };

      return response;
    } catch (error) {
      throw new AppError('Erro ao buscar por categorias. Por favor contate a equipe de suporte.');
    }
  }

  async findById(id) {
    try {
      const category = await knex('categories').where({ id }).first();
      return category;
    } catch (error) {
      throw new AppError('Erro ao buscar por categoria. Por favor contate a equipe de suporte.');
    }
  }

  async findByDescription(description) {
    try {
      const category = await knex('categories').where({ description }).first();
      return category;
    } catch (error) {
      throw new AppError('Erro ao buscar por categoria. Por favor contate a equipe de suporte.');
    }
  }

  async update({ id, description, image, isActive }) {
    try {
      await knex('categories').where({ id }).update({ description, image, isActive, updatedAt: new Date() });
    } catch (error) {
      throw new AppError('Erro ao atualizar categoria. Por favor contate a equipe de suporte.');
    }
  }

  async delete(id) {
    try {
      await knex('categories').where({ id }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar categoria. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = CategoriesRepository;
