var Model = require('./model');
var vikiImport = require('./viki-import');

function importMenu (buffer) {
  return vikiImport(buffer, { type: 'binary' }).then(Model.createMenu);
}

function list() {
  console.log('list');
  return Model.list();
}

function find(id) {
  return Model.findById(id);
}

function findCurrent() {
  return Model.findCurrent();
}

module.exports = {
  list,
  find,
  findCurrent,
  importMenu,
  findNextWeek: findCurrent,
};
