var util = require('util');
var service = require('./service');
var responseHelper = require('./../../utils/responseHelper');
var def = require('./../../utils/defaultController');

function currentMenu(req, res, next) {
    service.getCurrent().then(function(data) {
      // If find by id and result is null
      if (req.params.id && !data) {
        responseHelper.noContent(res);
      } else {
        responseHelper.ok(res, data);
      }
    }, function(err) {
      if (util.isError(err)) {
        next(err);
      } else {
        responseHelper.badRequest(res, err);
      }
    });
  };

module.exports = {
  getCurrent: currentMenu,
  updateCurrent: def(service.updateCurrent)
};
