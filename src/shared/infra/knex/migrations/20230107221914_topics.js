exports.up = knex =>
  knex.schema.createTable('topcs', table => {
    table.uuid('id').unique().primary().defaultTo(knex.raw('public.uuid_generate_v4()'));
    table.integer('sequence').unique();
    table.text('description').notNullable();
    table.text('image');
    table.uuid('categoryId').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());

    table.foreign('categoryId').references('categories.id');
  });

exports.down = knex => knex.schema.dropTable('topcs');
