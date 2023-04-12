exports.up = knex =>
  knex.schema.createTable('questionsTypes', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.text('code').notNullable();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.boolean('isActive').defaultTo(true);

    table.timestamps(true, true, true);
  });

exports.down = knex => knex.schema.dropTable('questionsTypes');
