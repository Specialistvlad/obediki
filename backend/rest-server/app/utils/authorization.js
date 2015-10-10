var ConnectRoles = require('connect-roles');

var userRoles = require('./../../config').userRoles;
var dictUserRoles = require('./../dicts/user-roles').keys;

module.exports = function(app) {
  // Authentication
  var roles = new ConnectRoles({
    failureHandler: failureHandler,
    userProperty: 'user'
  });
  app.use(roles.middleware());
  roles.use(authorizationHandler);
  return roles;
};

function authorizationHandler(req, action) {
  if (req.user) {
    if (req.user.role && dictUserRoles.indexOf(req.user.role) > -1 && userRoles[req.user.role]) {
      return userRoles[req.user.role].indexOf(action) > -1;
    } else {
      //console.log('User or his role not found!', req.user);
      return false;
    }
  } else {
    return userRoles[dictUserRoles[0]].indexOf(action) > -1;
  }
}

function failureHandler(req, res, action) {
  res.forbidden('Access Denied - You don\'t have permission to: ' + action);
}
