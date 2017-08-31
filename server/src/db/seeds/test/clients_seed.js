exports.seed = function(knex, Promise) {
  return knex('clients').del()
    .then(function() {
      return knex('clients').insert({
        name: 'client1',
        address: '1 Street',
        postcode: 'AB12 34CD',
        city: 'Edinburgh',
        country: 'UK',
        notes: 'bla bla bla',
        company_id: 1,
        type_id: 123
      });
    }).then(function() {
      return knex('clients').insert({
        name: 'client2',
        address: '2 Street',
        postcode: 'EF12 34GH',
        city: 'Edinburgh',
        country: 'UK',
        notes: 'bla bla bla',
        company_id: 2,
        type_id: 234
      });
    }).then(function() {
      return knex('clients').insert({
        name: 'client3',
        address: '3 Street',
        postcode: 'IJ12 34KL',
        city: 'Edinburgh',
        country: 'UK',
        notes: 'bla bla bla',
        company_id: 3,
        type_id: 345
      });
    });
};
