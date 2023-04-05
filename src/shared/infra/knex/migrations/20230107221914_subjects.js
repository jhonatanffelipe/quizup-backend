exports.up = knex =>
  knex.schema.createTable('subjects', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.integer('sequence');
    table.text('description').notNullable();
    table.text('image');
    table.uuid('categoryId').notNullable();
    table.boolean('isActive').defaultTo(true);

    table.timestamps(true, true, true);

    table.foreign('categoryId').references('categories.id');
  });

exports.down = knex => knex.schema.dropTable('subjects');
