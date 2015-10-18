var config = require('./../../../config');
var securePassport = require('./../../../config/secure/passport');
var service = require('./service');
var validation = require('./validation');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var passportConfig = {
  successRedirect: config.web.address,
  successFlash: 'Welcome!',
  failureRedirect: config.web.address+'/public',
  failureFlash: 'Invalid username or password.'
}

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => service.findById(id).exec(done));

function register (app, roles) {
  for (var social in securePassport) {
    app.get('/api/auth/'+social, passport.authenticate(social));
    app.get('/api/auth/'+social+'/callback', passport.authenticate(social, passportConfig));
  }
}

function socialCallback (accessToken, refreshToken, profile, done) {
  service.socialNetwork({accessToken, refreshToken, profile})
    .then(res => done(null, res), err => done(err));
};

for (var social in securePassport) {
  var options = securePassport[social];
  options.callbackURL = config.web.address + 'api/auth/'+social+'/callback';

  var moduleName = 'passport-'+social+
    (social === 'github' ? '2' :
      (social === 'linkedin' ? '-oauth2' : '')
    );
  passport.use(new (require(moduleName).Strategy)(options, socialCallback));
}

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
