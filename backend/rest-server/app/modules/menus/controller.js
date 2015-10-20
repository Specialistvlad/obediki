var service = require('./service');
var def = require('./../../utils/defaultController');

function create (req, res) {
  req.body.file = req.file;
  service.importMenu(req.body)
    .then(function(menuItem) {
      res.ok(menuItem);
    }, function(err) {
      res.badRequest(err);
    });
}

module.exports = {
  create: create,
  list: def(service.list),
  find: def(service.find),
  update: def(service.update),
  remove: def(service.remove),
  getNextWeek: def(service.getNextWeek),
};
