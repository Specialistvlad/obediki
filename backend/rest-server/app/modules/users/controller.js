var util = require('util');
var service = require('./service');
var responseHelper = require('./../../utils/responseHelper');
var validation = require('./validation');
var passport = require('./passport');

function def(serviceMethod) {
  return function defaultController(req, res, next) {
      // Sanitarize _id
      if (req.body._id) {
        delete req.body._id;
      }
      var args = [];
      if (req.params.id) {
        args.push(req.param.id);
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
}

function confirmEmail(req, res, next) {
  service.confirmEmail(req.params.token).then(function() {
      res.send('Email confirmed!');
    }, function(err) {
      if (util.isError(err)) {
        next(err);
      } else {
        res.status(400).send('Email not confirmed!');
      }
    });
}

function createTokenForPasswordReset(req, res) {
  validation.emailForPasswordReset(req.body)
    .then(function (data) {
      return service.createTokenForPasswordReset(data.email);
    })
    .then(function (data) {
      responseHelper.ok(res, data);
    }, function (err) {
      responseHelper.badRequest(res, err);
    });
}

function checkToken(req, res, next) {
  var token = req.params.token;
  if (!token) {
    return responseHelper.badRequest(res, 'Token is required');
  }

  service.findByResetPasswordToken(token)
    .then(user.checkResetPasswordToken)
    .then(function (data) {
      responseHelper.ok(res, data);
    }, function (err) {
      console.log(err);
      responseHelper.badRequest(res, err);
    });
}

function changePassword(req, res, next) {
  var token = req.body.token;
  var password = req.body.password;
  if (token) {
    service.findByResetPasswordToken(token).exec(function(err, user) {
      if (err) {
        return next(err);
      }
      user.checkResetPasswordToken(token)
      .then(function() {
        service.setPassword(user, password).then(function() {
          return responseHelper.ok(res, 'Password changed successfully');
        });
      });
    });
  } else {
    responseHelper.badRequest(res, 'Token is required');
  }
}

module.exports = {
  create: def(service.create),
  login: passport.login,
  createTokenForPasswordReset: createTokenForPasswordReset,
  checkToken: checkToken,
  changePassword: changePassword,
  confirmEmail: confirmEmail
};
