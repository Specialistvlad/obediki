var responseHelper = require('./responseHelper');

module.exports = function def(serviceMethod) {
  return function defaultController(req, res, next) {
      // Sanitarize _id
      if (req.body._id) {
        delete req.body._id;
      }
      var args = [];
      if (req.params.id) {
        args.push(req.params.id);
      }
      if (req.body) {
        args.push(req.body);
      }

      serviceMethod.apply(null, args).then(function(data) {
        // If find by id and result is null
        if (req.params.id && !data) {
          responseHelper.noContent(res);
        } else {
          responseHelper.ok(res, data);
        }
      }, function(err) {
        responseHelper.badRequest(res, err);
      });
    };
};
