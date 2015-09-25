var ConnectRoles = require('connect-roles');
var responseHelper = require('./responseHelper');

var userRoles = require('./../../config').userRoles;

module.exports = function(app) {
  // Authentication
  var roles = new ConnectRoles({
    failureHandler: failureHandler,
    userProperty: 'user'
  });
  app.use(roles.middleware());
  roles.use(authHandler);
  return roles;
};

function authHandler(req, action) {
  return userRoles.anonymous.indexOf(action) > -1;
}

function failureHandler(req, res, action) {
  responseHelper.forbidden(res, 'Access Denied - You don\'t have permission to: ' + action);
}
