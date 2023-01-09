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

  async find() {
    try {
      const users = await knex('users').orderBy('name');
      return users;
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

  async update({ id, name, password, avatar, isActive, isAdmin }) {
    try {
      await knex('users').where({ id }).update({
        name,
        avatar,
        password,
        isActive,
        isAdmin,
      });
    } catch (error) {
      throw new AppError('Erro ao atualizar usuário. Por favor contate a equipe de suporte.');
    }
  }
}

module.exports = UsersRepository;
