
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients', function(table){
    table.increments();
    table.string('name').notNullable().unique();
    table.string('address').notNullable();
    table.string('postcode').notNullable();
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.text('notes').notNullable();
    table.integer('company_id').notNullable();
    table.integer('type_id').notNullable();
    
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clients');
};
