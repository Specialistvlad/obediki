var util = require('util');
var service = require('./service');
var def = require('./../../utils/defaultController');
var validation = require('./validation');
var passport = require('./passport');

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
      res.ok(data);
    }, function (err) {
      res.badRequest(err);
    });
}

function checkToken(req, res, next) {
  var token = req.params.token;
  if (!token) {
    return res.badRequest('Token is required');
  }

  service.findByResetPasswordToken(token)
    .then(user.checkResetPasswordToken)
    .then(function (data) {
      res.ok(data);
    }, function (err) {
      console.log(err);
      res.badRequest(err);
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
          return res.ok('Password changed successfully');
        });
      });
    });
  } else {
    res.badRequest('Token is required');
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
