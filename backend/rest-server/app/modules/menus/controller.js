var util = require('util');
var service = require('./service');
var responseHelper = require('./../../utils/responseHelper');

function defaultBehavior(serviceMethod) {
  return function defaultController(req, res, next) {
      // Sanitarize _id
      if (req.body._id) {
        delete req.body._id;
      }
      
      serviceMethod(req.params.id, req.body).then(function(data) {
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
}

function nextWeekMenu(req, res, next) {
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
  notImplemented: function(req, res) {
    responseHelper.notImplemented(res);
  },
  getItem: defaultBehavior(service.getItem),
  //getCurrent: currentMenu,
  getNextWeek: nextWeekMenu,
  list: defaultBehavior(service.list)
};
