var config = require('./../../../config');
var securePassport = require('./../../../config/secure/passport');
var service = require('./service');
var validation = require('./validation');

var passportConfig = {
  successRedirect: config.web.address,
  successFlash: 'Welcome!',
  failureRedirect: config.web.address+'/public',
  failureFlash: 'Invalid username or password.'
}
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var LinkedinStrategy = require('passport-linkedin').Strategy;

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => service.findById(id).exec(done));

function register (app, roles) {
  app.get('/api/auth/vkontakte', passport.authenticate('vkontakte'));
  app.get('/api/auth/vkontakte/callback', passport.authenticate('vkontakte', passportConfig));
  app.get('/api/auth/facebook', passport.authenticate('facebook'));
  app.get('/api/auth/facebook/callback', passport.authenticate('facebook', passportConfig));
  app.get('/api/auth/google', passport.authenticate('google'));
  app.get('/api/auth/google/callback', passport.authenticate('google', passportConfig));
  app.get('/api/auth/github', passport.authenticate('github'));
  app.get('/api/auth/github/callback', passport.authenticate('github', passportConfig));
  app.get('/api/auth/linkedin', passport.authenticate('linkedin'));
  app.get('/api/auth/linkedin/callback', passport.authenticate('linkedin', passportConfig));
}

var socialCallback = function (accessToken, refreshToken, profile, done) {
  service.socialNetwork({accessToken, refreshToken, profile})
    .then(res => done(null, res), err => done(err));
};

var optionsVK = securePassport.vkontakte;
optionsVK.callbackURL = config.web.address + 'api/auth/vkontakte/callback';
passport.use(new VKontakteStrategy(optionsVK, socialCallback));

var optionsFB = securePassport.facebook;
optionsFB.callbackURL = config.web.address + 'api/auth/facebook/callback';
passport.use(new FacebookStrategy(optionsFB, socialCallback));


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => service.findByEmailAndPassword(email, password).exec(done)
  ));

function login(req, res, next) {
  validation.login(req.body).then(function () {
    passport.authenticate('local', function(err, user, info) {
      if (err || info) {
        return res.badRequest(err || info);
      }

      if (!user) {
        return res.unauthorized('Wrong email or password');
      }
      req.login(user, () => res.ok(user));
    })(req, res, next);
  }, err => res.badRequest(err))
};

module.exports = {
  register,
  login
}
