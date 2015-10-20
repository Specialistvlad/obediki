var _ = require('lodash');
var dateUtils = require('../../utils/dateUtils');

var Model = require('./model');
var validation = require('./validation');
var vikiImport = require('./vendor-parsers/viki');

function importMenu(data) {
  return validation.importMenu(data)
    .then(() => vikiImport(data.file.buffer, { type: 'binary' }))
    .then(menu => {
      var week = dateUtils.startAndEndOfWeek(data.dateFrom);
      menu.dateFrom = week[0];
      menu.dateTo = week[1];
      return Model.createMenu(menu);
    });
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
