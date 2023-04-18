exports.up = knex =>
  knex.schema.createTable('answers', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.uuid('questionId').notNullable();
    table.uuid('description').notNullable();
    table.boolean('isTrue').defaultTo(true);
    table.integer('value');
    table.uuid('questionRelationId');

    table.timestamps(true, true, true);

    table.foreign('questionRelationId').references('questions.id');
  });

exports.down = knex => knex.schema.dropTable('answers');
