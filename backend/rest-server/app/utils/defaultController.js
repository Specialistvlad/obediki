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

      if (req.user) {
        args.push(req.user);
      }

      serviceMethod.apply(null, args).then(function(data) {
        // If find by id and result is null
        if (!data) {
          res.noContent();
        } else {
          res.ok(data);
        }
      }, function(err) {
        res.badRequest(err);
      });
    };
};
