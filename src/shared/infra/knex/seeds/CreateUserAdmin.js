const { hashSync } = require('bcryptjs');

exports.seed = async knex => {
  await knex('users').del();

  const passwordHash = hashSync('Mudar@123', 8);

  await knex('users').insert([
    {
      name: 'Administrador',
      email: 'admin@quizup.com.br',
      password: passwordHash,
      isActive: true,
      isAdmin: true,
    },
  ]);
};
