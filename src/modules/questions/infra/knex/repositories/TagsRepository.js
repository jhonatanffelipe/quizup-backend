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
    try {
      const tags = await knex('tags')
        .orderBy('description')
        .limit(perPage)
        .offset((page - 1) * perPage);

      const count = await knex('tags').count();
      return { tags, count: count[0]?.count > 0 ? Number(count[0].count) : 0 };
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
