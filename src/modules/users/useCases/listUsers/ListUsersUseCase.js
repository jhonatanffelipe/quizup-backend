const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ListUsersUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async excute({ page, perPage }) {
    if (!page || page <= 0) {
      page = 1;
    }

    if (!perPage || perPage <= 0) {
      perPage = 5;
    }

    const data = await this.usersRepository.find({ page, perPage });

    const response = {
      perPage,
      currentPage: page,
      totalRows: data.count,
      data: data.users,
    };

    response.data.map(user => {
      delete user.password;
      user.avatar = user.avatar && `${process.env.BACKEND_APP_URL}/avatar/${user.avatar}`;
      return user;
    });

    return response;
  }
}

module.exports = ListUsersUseCase;
