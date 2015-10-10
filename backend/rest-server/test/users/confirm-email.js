var path = require('path');
var promise = require('bluebird');

var h = require('./../helpers');
var fixture = require('./fixture');
var userModel = h.importModel('users', __dirname);

describe('with right token', function () {
  var confirmObject;

  // Delete user > Create user > Save token
  before(function () {
    return removeUserByEmail(fixture.confirmEmail.email)
      .then(function () {
        return apiCreateUser(fixture.confirmEmail, 200);
      })
      .then(function (res) {
        var user = res.body;
        confirmObject = user.email.confirmation;
        return new promise(function (resolve) {
          resolve(user);
        });
      });
  });

  // Confirm email with saved token
  it('should works', function handler() {
    return apiConfirmEmail(confirmObject.token, 200);
    // TODO Check confirmation description
  });

  after(function () {
    return removeUserByEmail(fixture.confirmEmail.email);
  });
});

describe('with random token', function () {
  // Confirm email with random token
  it('should not works', function handler() {
    return apiConfirmEmail('asdfghjkl', 400);
    // TODO Check error description
  });
});

// TODO Need also test for checking token expiration time

function removeUserByEmail(email, callback) {
  return userModel.remove({'email.value': email}, callback);
}

function apiCreateUser(fixture, expectCode) {
  return h.request(h.url)
    .post(path.join('api', 'users'))
    .json(fixture)
    .expect(expectCode)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end();
}

function apiConfirmEmail(token, expectCode) {
  return h.request(h.url)
    .get(path.join('api', 'users', 'confirm-email', token))
    .expect(expectCode)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end();
}
