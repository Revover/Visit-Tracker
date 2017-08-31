var knex = require('./knex.js');

function Clients() {
  return knex('clients');
}

// *** queries *** //
function getAll() {
  return Clients().select();
}

function getSingle(clientID) {
  return Clients().where('id', parseInt(clientID)).first();
}

function add(client) {
  return Clients().insert(client, 'id');
}

function update(clientID, updates) {
  return Clients().where('id', parseInt(clientID)).update(updates)
}

function deleteItem(clientID) {
  return Clients().where('id', parseInt(clientID)).del();
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  add: add,
  update: update,
  deleteItem: deleteItem
};
