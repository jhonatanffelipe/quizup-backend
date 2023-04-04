exports.up = knex =>
  knex.schema.createTable('questions', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.text('description').notNullable();
    table.text('info').notNullable();
    table.uuid('topicId').notNullable();
    table.uuid('userId').notNullable();

    table.timestamps(true, true, true);

    table.foreign('topicId').references('topics.id');
    table.foreign('userId').references('users.id');
  });

exports.down = knex => knex.schema.dropTable('questions');
