var service = require('./service');
var responseHelper = require('./../../utils/responseHelper');
var validation = require('./validation');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  service.findById(id).exec(done);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    service.findByEmailAndPassword(email, password).exec(done);
  }
));

function login(req, res, next) {
  validation.login(req.body).then(function () {
    passport.authenticate('local', function(err, user, info) {
      if (err || info) {
        console.log(info);
        return responseHelper.badRequest(res, err || info);
      }

      if (!user) {
        return responseHelper.unauthorized(res, {message: 'Wrong email or password'});
      }

      responseHelper.ok(res, user);
    })(req, res, next);
  }, function (err) {
    return responseHelper.badRequest(res, err);
  })
};

module.exports = {
  login
}
