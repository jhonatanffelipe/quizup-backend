module.exports = {
  client: 'pg',
  connection: {
    database: 'turtle-quiz-db',
    user: 'postgres',
    password: '123456',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/shared/database/migrations`,
  },
  seeds: {
    tableName: 'knex_seeds',
    directory: `${__dirname}/src/shared/database/seeds`,
  },
};
