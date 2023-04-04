exports.up = knex =>
  knex.schema.createTable('usersTokens', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.uuid('userId').notNullable();
    table.text('accessToken').notNullable();
    table.timestamp('accessTokenExpiresDate').notNullable();

    table.timestamps(true, true, true);

    table.foreign('userId').references('users.id');
  });

exports.down = knex => knex.schema.dropTable('usersTokens');
