const knex = require('../../../../../config/db');

class UsersRepository {
  async create({ name, email, password, isAdmin }) {
    await knex('users').insert({
      name,
      email,
      password,
      isAdmin,
    });
  }

  async find() {
    const users = await knex('users').orderBy('name');
    return users;
  }

  async findByEmail(email) {
    const user = await knex('users').where({ email }).first();
    return user;
  }

  async findById(id) {
    const user = await knex('users').where({ id }).first();
    return user;
  }

  async update({ id, name, password }) {
    if (password) {
      await knex('users').where({ id }).update({
        name,
        password,
      });
    } else {
      await knex('users').where({ id }).update({
        name,
      });
    }
  }
}

module.exports = UsersRepository;
