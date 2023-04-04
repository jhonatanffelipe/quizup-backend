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

  async find() {
    try {
      const tags = await knex('tags').orderBy('description');
      return tags;
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

  async update({ id, description }) {
    try {
      await knex('tags').where({ id }).update({ description, updatedAt: new Date() });
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
