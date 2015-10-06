var service = require('./service');
var responseHelper = require('./../../utils/responseHelper');
var def = require('./../../utils/defaultController');

function create (req, res) {
  if (req.file) {
    service.importMenu(req.file.buffer)
      .then(function(menuItem) {
        responseHelper.ok(res, menuItem);
      }, function(err) {
        responseHelper.badRequest(res, 'Error while parsing file');
      });
  } else {
    responseHelper.badRequest(res, 'Unknown error');
  }
}

module.exports = {
  create: create,
  list: def(service.list),
  find: def(service.find),
  update: def(service.update),
  remove: def(service.remove),
  getNextWeek: def(service.findCurrent),
};
