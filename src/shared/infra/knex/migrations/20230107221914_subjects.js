exports.up = knex =>
  knex.schema.createTable('subjects', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.uuid('categoryId').notNullable();
    table.uuid('previousSubjectId');
    table.integer('sequence');
    table.text('description').notNullable();
    table.text('image');
    table.boolean('isActive').defaultTo(true);

    table.timestamps(true, true, true);

    table.foreign('categoryId').references('categories.id');
    table.foreign('previousSubjectId').references('subjects.id');
  });

exports.down = knex => knex.schema.dropTable('subjects');
