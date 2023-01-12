const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class TopicsRepository {
  async create({ sequence, description, categoryId }) {
    try {
      await knex('topics').insert({
        sequence,
        description,
        categoryId,
      });
    } catch (error) {
      throw new AppError('Erro ao criar tópico. Por favor contate a equipe de suporte.');
    }
  }

  async find(categoryId) {
    try {
      const topics = await knex('topics').where({ categoryId }).orderBy('sequence', 'asc');
      return topics;
    } catch (error) {
      throw new AppError('Erro ao buscar por tópico. Por favor contate a equipe de suporte.');
    }
  }

  async findById({ id, categoryId }) {
    try {
      const topic = await knex('topics').where({ id, categoryId }).first();
      return topic;
    } catch (error) {
      throw new AppError('Erro ao buscar por tópico. Por favor contate a equipe de suporte.');
    }
  }

  async findByDescription({ description, categoryId }) {
    try {
      const topic = await knex('topics').where({ description, categoryId }).first();
      return topic;
    } catch (error) {
      throw new AppError('Erro ao buscar por tópico. Por favor contate a equipe de suporte.');
    }
  }

  async findNextTopcs({ sequence, categoryId }) {
    try {
      const nextTopics = await knex('topics')
        .where({ categoryId })
        .andWhere('sequence', '>=', sequence)
        .orderBy('sequence', 'desc');
      return nextTopics;
    } catch (error) {
      throw new AppError('Erro ao buscar por tópicos. Por favor contate a equipe de suporte.');
    }
  }

  async update({ id, sequence, description, image }) {
    try {
      await knex('topics').where({ id }).update({
        sequence,
        description,
        image,
      });
    } catch (error) {
      throw new AppError('Erro ao atualizar tópico. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = TopicsRepository;
