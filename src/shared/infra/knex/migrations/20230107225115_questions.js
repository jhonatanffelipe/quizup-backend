exports.up = knex =>
  knex.schema.createTable('questions', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.uuid('subjectId').notNullable();
    table.uuid('questionTypeId').notNullable();
    table.uuid('userId').notNullable();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.boolean('isActive').defaultTo(true);

    table.timestamps(true, true, true);

    table.foreign('subjectId').references('subjects.id');
    table.foreign('userId').references('users.id');
    table.foreign('questionTypeId').references('questionsTypes.id');
  });

exports.down = knex => knex.schema.dropTable('questions');
