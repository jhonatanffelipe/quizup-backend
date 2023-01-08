exports.up = (knex) => knex.schema.createTable('questionsTags', (table) => {
  table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
  table.uuid('questionId');
  table.uuid('tagsId');

  table.timestamp('createdAt').defaultTo(knex.fn.now());
  table.timestamp('updatedAt').defaultTo(knex.fn.now());

  table.foreign('questionId').references('questions.id');
  table.foreign('tagsId').references('tags.id');
});

exports.down = (knex) => knex.schema.dropTable('questionsTags');
