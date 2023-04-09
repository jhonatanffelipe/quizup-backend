const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class QuestionsTypesRepository {
  async create({ code, title, description }) {
    try {
      await knex('questionsTypes').insert({ code, title, description });
    } catch (error) {
      throw new AppError('Erro ao criar tipo de questão. Por favor contate a equipe de suporte.');
    }
  }

  async find({ page, perPage, title }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    try {
      const questionsTypes = await knex('questionsTypes')
        .whereILike('title', `%${title}%`)
        .orderBy('title')
        .limit(perPage)
        .offset((page - 1) * perPage);

      const count = await knex('questionsTypes').whereILike('title', `%${title}%`).count();

      const response = {
        perPage: Number(perPage),
        currentPage: Number(page),
        totalRows: count[0]?.count > 0 ? Number(count[0].count) : 0,
        data: questionsTypes,
      };

      return response;
    } catch (error) {
      throw new AppError('Erro ao listar tipos de questões. Por favor contate a equipe de suporte.');
    }
  }

  async findById(id) {
    try {
      const category = await knex('questionsTypes').where({ id }).first();
      return category;
    } catch (error) {
      throw new AppError(
        'Erro ao buscar por tipo de questão pelo id informado. Por favor contate a equipe de suporte.',
      );
    }
  }

  async findByTitle(title) {
    try {
      const category = await knex('questionsTypes').where({ title }).first();
      return category;
    } catch (error) {
      throw new AppError(
        'Erro ao buscar por tipo de questão pelo título informado. Por favor contate a equipe de suporte.',
      );
    }
  }

  async findByCode(code) {
    try {
      const category = await knex('questionsTypes').where({ code }).first();
      return category;
    } catch (error) {
      throw new AppError(
        'Erro ao buscar por tipo de questão pelo código informado. Por favor contate a equipe de suporte.',
      );
    }
  }

  async update({ id, code, title, description }) {
    try {
      await knex('questionsTypes').where({ id }).update({ code, title, description, updatedAt: new Date() });
    } catch (error) {
      throw new AppError('Erro ao atualizar tipo de questão. Por favor contate a equipe de suporte.');
    }
  }

  async delete(id) {
    try {
      await knex('questionsTypes').where({ id }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar tipo de questão. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = QuestionsTypesRepository;
