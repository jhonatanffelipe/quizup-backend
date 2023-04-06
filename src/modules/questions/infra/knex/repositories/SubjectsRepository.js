const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class SubjectsRepository {
  async create({ sequence, description, categoryId }) {
    try {
      await knex('subjects').insert({
        sequence,
        description,
        categoryId,
      });
    } catch (error) {
      throw new AppError('Erro ao criar assunto. Por favor contate a equipe de suporte.');
    }
  }

  async findAllByCategoryId({ page, perPage, categoryId }) {
    try {
      const subjects = await knex('subjects')
        .where({ categoryId })
        .orderBy('sequence', 'asc')
        .limit(perPage)
        .offset((page - 1) * perPage);

      const count = await knex('subjects').count();
      return { subjects, count: count[0]?.count > 0 ? Number(count[0].count) : 0 };
    } catch (error) {
      throw new AppError('Erro ao buscar por assunto. Por favor contate a equipe de suporte.');
    }
  }

  async findById(id) {
    try {
      const subject = await knex('subjects').where({ id }).first();
      return subject;
    } catch (error) {
      throw new AppError('Erro ao buscar por assunto. Por favor contate a equipe de suporte.');
    }
  }

  async findByDescription({ description, categoryId }) {
    try {
      const subject = await knex('subjects').where({ description, categoryId }).first();
      return subject;
    } catch (error) {
      throw new AppError('Erro ao buscar por descrição do assunto. Por favor contate a equipe de suporte.');
    }
  }

  async findNextSubjects({ sequence, categoryId }) {
    try {
      const nextSubjects = await knex('subjects')
        .where({ categoryId })
        .andWhere('sequence', '>=', sequence)
        .orderBy('sequence', 'desc');
      return nextSubjects;
    } catch (error) {
      throw new AppError('Erro ao buscar próximos assuntos. Por favor contate a equipe de suporte.');
    }
  }

  async findBySequence({ sequence, categoryId }) {
    try {
      const subject = await knex('subjects').where({ sequence, categoryId }).first();
      return subject;
    } catch (error) {
      throw new AppError('Erro ao buscar por assunto pela sequência. Por favor contate a equipe de suporte.');
    }
  }

  async findBetween({ initalSequence, finalSequence }) {
    try {
      const subjects = await knex('subjects')
        .where('sequence', '>', initalSequence)
        .andWhere('sequence', '<=', finalSequence)
        .orderBy('sequence', 'asc');

      return subjects;
    } catch (error) {
      throw new AppError('Erro ao buscar por assuntos do intervalo. Por favor contate a equipe de suporte.');
    }
  }

  async update({ id, sequence, description, image }) {
    try {
      await knex('subjects').where({ id }).update({
        sequence,
        description,
        image,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new AppError('Erro ao atualizar assunto. Por favor contate a equipe de suporte.');
    }
  }

  async delete(id) {
    try {
      await knex('subjects').where({ id }).del();
    } catch (error) {
      throw new AppError('Erro ao atualizar assunto. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = SubjectsRepository;
