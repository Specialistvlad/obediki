var service = require('./service');
var def = require('./../../utils/defaultController');

function create (req, res) {
  if (req.file) {
    service.importMenu(req.file.buffer)
      .then(function(menuItem) {
        res.ok(menuItem);
      }, function(err) {
        res.badRequest('Error while parsing file');
      });
  } else {
    res.badRequest('Unknown error');
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
