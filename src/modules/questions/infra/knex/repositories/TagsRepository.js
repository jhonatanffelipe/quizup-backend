const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class TagsRepository {
  async create(description) {
    try {
      await knex('tags').insert({ description });
    } catch (error) {
      throw new AppError('Erro ao criar tag. Por favor contate a equipe de suporte.');
    }
  }

  async find({ page, perPage }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    try {
      const tags = await knex('tags')
        .orderBy('description')
        .limit(perPage)
        .offset((page - 1) * perPage);

      const count = await knex('tags').count();

      const response = {
        perPage: Number(perPage),
        currentPage: Number(page),
        totalRows: count[0]?.count > 0 ? Number(count[0].count) : 0,
        data: tags,
      };
      return response;
    } catch (error) {
      throw new AppError('Erro ao buscar por tags. Por favor contate a equipe de suporte.');
    }
  }

  async findById(id) {
    try {
      const tag = await knex('tags').where({ id }).first();
      return tag;
    } catch (error) {
      throw new AppError('Erro ao buscar por tag. Por favor contate a equipe de suporte.');
    }
  }

  async findByDescription(description) {
    try {
      const tag = await knex('tags').where({ description }).first();
      return tag;
    } catch (error) {
      throw new AppError('Erro ao buscar por tag. Por favor contate a equipe de suporte.');
    }
  }

  async update({ id, description, isActive }) {
    try {
      await knex('tags').where({ id }).update({ description, isActive, updatedAt: new Date() });
    } catch (error) {
      throw new AppError('Erro ao atualizar tag. Por favor contate a equipe de suporte.');
    }
  }

  async delete(id) {
    try {
      await knex('tags').where({ id }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar tag. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = TagsRepository;
