var Model = require('./model');

function getCurrent() {
  return Model.getCurrent();
}

function updateCurrent() {
  return Model.getCurrent();
}

module.exports = {
  getCurrent: getCurrent,
  updateCurrent: updateCurrent
};
