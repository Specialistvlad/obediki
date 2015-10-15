var service = require('./service');
var def = require('./../../utils/defaultController');

module.exports = {
  findNextWeek: def(service.findNextWeek),
  updateNextWeek: def(service.updateNextWeek),
  list: def(service.list),
  findById: def(service.findById),
};
