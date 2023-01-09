exports.up = knex =>
  knex.schema.createTable('categories', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.text('description').notNullable().unique();
    table.text('image');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('categories');
