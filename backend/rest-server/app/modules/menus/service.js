var Model = require('./model');
var vikiImport = require('./viki-import');

function createMenu (argument) {
  return vikiImport.parse(argument)
    .then(Model.createMenu);
}

function list() {
  return Model.list();
}

function getItem(id) {
  return Model.getItem(id);
}

function getCurrent() {
  return Model.getCurrent();
}

module.exports = {
  list: list,
  getItem: getItem,
  getCurrent: getCurrent,
  getNextWeek: getCurrent,
  createMenu: createMenu
};
