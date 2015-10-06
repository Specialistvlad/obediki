var Model = require('./model');
var vikiImport = require('./viki-import');
var _ = require('lodash');

function importMenu(buffer) {
  return vikiImport(buffer, { type: 'binary' }).then(Model.createMenu);
}

function list() {
  return Model.list();
}

function find(id) {
  return Model.findById(id);
}

function findCurrent() {
  return Model.findCurrent();
}

function remove(id) {
  return Model.removeById(id);
}

function update(id, data) {
  return find(id).then(function(model) {
    model.seen = data.seen;
    model.approved = data.approved;
    return model.save();
  });
}

module.exports = {
  update,
  list,
  find,
  remove,
  findCurrent,
  importMenu,
  findNextWeek: findCurrent,
};
