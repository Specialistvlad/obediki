var config = require('./../config');
var path = require('path');
var express = require('express');

// Short notify
// POST     C reate
// GET      R ead
// PUT      U pdate
// DELETE   D elete

var passport = require('./modules/users/passport');
var moduleUsers = require('./modules/users/routes');
var moduleMenus = require('./modules/menus/routes');
var moduleOrders = require('./modules/orders/routes');

module.exports = function(app, roles) {

  // Main API
  passport.register(app, roles);
  moduleUsers.register(app, roles);
  moduleMenus.register(app, roles);
  moduleOrders.register(app, roles);

  // Routes need for frontend app
  defineMainSiteRoutes(app, config.frontend.siteRoutes);

  //app.all('/sink.html', function (req, res) { res.send(''); });

  if (config.develop) {
    app.get('/ErrorExample', exceptionExample);
  }

  //app.use(exceptionHandler);

  // Endpoint routes handlers
  //app.use(notFoundHandler);
};

function defineMainSiteRoutes(app, routes) {
  routes.forEach(function (item) {
    app.use(item, express.static(path.join(__dirname, config.web.publicDir, 'index.html')));
  });
}

function notFoundHandler(req, res) {
  req.notFound(res);
}

function exceptionHandler(err, req, res, next) {
  req.badRequest(res, err.stack);
}

function exceptionExample(req, res, next) {
  next(new Error('Random error!'));
}
