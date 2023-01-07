exports.up = (knex) => knex.schema.createTable('categories', (table) => {
  table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
  table.text('description').notNullable().unique();

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('categories');
