const knex = require('../../../../../config/db');
const AppError = require('../../../../../shared/infra/http/errors/AppError');

class UsersRepository {
  async create({ name, email, password, isAdmin }) {
    try {
      await knex('users').insert({
        name,
        email,
        password,
        isAdmin,
      });
    } catch (error) {
      throw new AppError('Erro ao criar usuário. Por favor contate a equipe de suporte.');
    }
  }

  async find({ page, perPage }) {
    try {
      const users = await knex('users')
        .limit(perPage)
        .offset((page - 1) * perPage)
        .orderBy('name');

      const count = await knex('users').count();
      return { users, count: count[0]?.count > 0 ? Number(count[0].count) : 0 };
    } catch (error) {
      throw new AppError('Erro ao listar usuários. Por favor contate a equipe de suporte.');
    }
  }

  async findByEmail(email) {
    try {
      const user = await knex('users').where({ email }).first();
      return user;
    } catch (error) {
      throw new AppError('Erro ao encontrar usuário. Por favor contate a equipe de suporte.');
    }
  }

  async findById(id) {
    try {
      const user = await knex('users').where({ id }).first();
      return user;
    } catch (error) {
      throw new AppError('Erro ao encontrar usuário. Por favor contate a equipe de suporte.');
    }
  }

  async update({ id, name, email, password, avatar, isActive, isAdmin }) {
    try {
      await knex('users').where({ id }).update({
        name,
        email,
        avatar,
        password,
        isActive,
        isAdmin,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new AppError('Erro ao atualizar usuário. Por favor contate a equipe de suporte.');
    }
  }

  async delete(id) {
    try {
      await knex('users').where({ id }).del();
    } catch (error) {
      throw new AppError('Erro ao deletar usuário. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = UsersRepository;
