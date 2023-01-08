exports.up = (knex) => knex.schema.createTable('questions', (table) => {
  table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
  table.text('description').notNullable();
  table.text('info').notNullable();
  table.uuid('categoryId').notNullable();
  table.uuid('topicId').notNullable();
  table.uuid('userId').notNullable();

  table.timestamp('createdAt').defaultTo(knex.fn.now());
  table.timestamp('updatedAt').defaultTo(knex.fn.now());

  table.foreign('categoryId').references('categories.id');
  table.foreign('topicId').references('topcs.id');
  table.foreign('userId').references('users.id');
});

exports.down = (knex) => knex.schema.dropTable('questions');
