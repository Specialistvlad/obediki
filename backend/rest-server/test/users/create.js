var path = require('path');

var h = require('./../helpers');
var fixture = require('./fixture');
var userModel = h.importModel('users');

describe('with right credentials', function () {
  before(function () {
    return removeUserByEmail(fixture.rightCredentials.email);
  });

  it('should works', function handler() {
    return doRequest(fixture.rightCredentials, 200);
    //TODO Check return object
  });

  // after(function () {
  //   return removeUserByEmail(fixture.rightCredentials.email);
  // });
});

describe('with same email', function () {
  before(function () {
    return removeUserByEmail(fixture.sameEmail.email)
      .then(function () {
        return doRequest(fixture.sameEmail, 200);
      });
  });

  it('should not works', function handler() {
    return doRequest(fixture.sameEmail, 400);
    //TODO Check error description
  });

  after(function () {
    return removeUserByEmail(fixture.sameEmail.email);
  });
});

describe('with bad credentials', function () {
  it('should not works', function handler() {
    return doRequest(fixture.badCredentials, 400);
  });
});

h.importTest('confirm-email', __dirname, 'confirm email');

function removeUserByEmail(email, callback) {
  return userModel.remove({'email.value': email}, callback);
}

function doRequest(fixture, expectCode) {
  return h.request(h.url)
    .post(path.join('api', 'users'))
    .json(fixture)
    .expect(expectCode)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end();
}
