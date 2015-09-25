var ValidatorHelper = require('./../../utils/validation');

function create(data) {
  var v = new ValidatorHelper(data);
  v.isEmail('email');
  v.isPassword('password');
  return v.promisify();
}

function login(data) {
  var v = new ValidatorHelper(data);
  v.isEmail('email');
  v.notEmpty('password');
  return v.promisify();
}

function emailForPasswordReset(data) {
  var v = new ValidatorHelper(data);
  v.isEmail('email');
  return v.promisify();
}

module.exports = {
  create,
  login,
  emailForPasswordReset
};
