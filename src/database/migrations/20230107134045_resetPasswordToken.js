exports.up = (knex) => knex.schema.createTable('resetPasswordToken', (table) => {
  table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
  table.uuid('userId').notNullable();
  table.text('token').notNullable();

  table.timestamp('createdAt').defaultTo(knex.fn.now());
  table.timestamp('updatedAt').defaultTo(knex.fn.now());

  table.foreign('userId').references('users.id');
});

exports.down = (knex) => knex.schema.dropTable('resetPasswordToken');
