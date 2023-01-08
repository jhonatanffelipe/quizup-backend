exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
  table.text('name').notNullable();
  table.text('email').notNullable();
  table.text('password').notNullable();
  table.text('avatar').notNullable();
  table.boolean('isActive').defaultTo(true);
  table.boolean('isAdmin').defaultTo(false);

  table.timestamp('createdAt').defaultTo(knex.fn.now());
  table.timestamp('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('users');
