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

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => service.findById(id).exec(done));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    (email, password, done) => service.findByEmailAndPassword(email, password).exec(done)
  ));

var optionsVK = securePassport.vkontakte;
optionsVK.callbackURL = config.web.address + 'api/auth/vkontakte/callback';
optionsVK.scope = ['offline'];
optionsVK.profileFields = ['city', 'bdate'];
passport.use(new VKontakteStrategy(optionsVK, (accessToken, refreshToken, profile, done) => {
  service.socialNetwork({accessToken, refreshToken, profile, name: 'vkontakte'})
    .then(res => done(null, res), err => done(err));
}));

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

function register (app, roles) {
  app.get('/api/auth/vkontakte', passport.authenticate('vkontakte'));
  app.get('/api/auth/vkontakte/callback', passport.authenticate('vkontakte', passportConfig));
}

module.exports = {
  register,
  login
}
