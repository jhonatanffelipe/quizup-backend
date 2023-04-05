exports.up = knex =>
  knex.schema.createTable('categories', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.text('description').notNullable().unique();
    table.text('image');
    table.boolean('isActive').defaultTo(true);

    table.timestamps(true, true, true);
  });

exports.down = knex => knex.schema.dropTable('categories');
