var config = require('./../config');

var morgan = require('morgan');
var path = require('path');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var redisStore = require('connect-redis')(session);

// Our middleware
var authorization = require('./utils/authorization');
var router = require('./router');

module.exports = function() {
  var app = express();

  // Static content
  app.use(express.static(path.join(__dirname, config.web.publicDir)));
  if (config.develop && config.web.apiDocsDir) {
    app.use('/apidoc', express.static(path.join(__dirname, config.web.apiDocsDir)));
  }
  // Parse application/json 5 MB Limit
  app.use(bodyParser.raw({limit: 5000}));
  // Parse application/json
  app.use(bodyParser.json());
  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}));

  app.multer = multer({
    limits: {
      fileSize: 10 * 1000000
      //TODO Need "file too large" exception handler
    }
  });

  // Configure Application Authentication
  app.use(cookieParser(config.web.cookieKey));
  app.use(session({
    secret: config.web.sessionKey,
    resave: false,
    saveUninitialized: false,
    store: new redisStore({})
  }));

  // Passport:
  app.use(passport.initialize());
  app.use(passport.session());

  if (!config.develop) {
    app.use(morgan('combined'));
    app.use(compression()); // Node.js compression middleware.
  } else {
    app.use(morgan('dev'));
  }

  // Configure Authorization
  var roles = authorization(app);
  // Configure Application Router
  router(app, roles);

  console.log('Web server listening at http://%s:%s', config.web.listen, config.web.port);
  app.listen(config.web.port, config.web.listen);
  return app;
};
