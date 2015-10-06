var service = require('./service');
var responseHelper = require('./../../utils/responseHelper');
var validation = require('./validation');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => service.findById(id).exec(done));
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => service.findByEmailAndPassword(email, password).exec(done)));

function login(req, res, next) {
  validation.login(req.body).then(function () {
    passport.authenticate('local', function(err, user, info) {
      if (err || info) {
        return responseHelper.badRequest(res, err || info);
      }

      if (!user) {
        return responseHelper.unauthorized(res, 'Wrong email or password');
      }
      req.login(user, () => responseHelper.ok(res, user));
    })(req, res, next);
  }, err => responseHelper.badRequest(res, err))
};

module.exports = {
  login
}
