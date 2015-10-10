var service = require('./service');
var validation = require('./validation');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => service.findById(id).exec(done));
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  (email, password, done) => service.findByEmailAndPassword(email, password).exec(done)));

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
  login
}
