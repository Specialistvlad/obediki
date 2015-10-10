var service = require('./service');
var def = require('./../../utils/defaultController');

module.exports = {
  create: def(service.create),
  find: def(service.find),
  update: def(service.update),
  getNextWeek: def(service.getNextWeek),
};
