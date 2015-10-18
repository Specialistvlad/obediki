var path = require('path');

var h = require('./../helpers');
var fixture = require('./fixture');
var userModel = h.importModel('users', __dirname);
var promise = require('bluebird');

describe('with right credentials', function () {
  before(function () {
    return removeUserByEmail(fixture.login.email)
      .then(function () {
        return apiCreateUser(fixture.login, 200);
      })
      .then(function (res) {
        //console.log(res.body);
        var user = res.body;
        confirmObject = user.email.confirmation;
        return new promise(function (resolve) {
          resolve(user);
        });
      });
  });

  it('should works', function handler() {
    return doRequest(fixture.login, 200);
  });

  after(function () {
    return removeUserByEmail(fixture.login.email);
  });
});

describe('with bad credentials', function () {
  it('should not works', function handler() {
    return doRequest({email: 'wrong', password: 'bad pass'}, 400);
  });
});

describe('with empty login and password', function () {
  it('should not works', function handler() {
    return doRequest({email: '', password: ''}, 400);
  });
});

describe('with empty password', function () {
  it('should not works', function handler() {
    return doRequest({email: 'test@hello.com'}, 400);
  });
});

describe('with empty username', function () {
  it('should not works', function handler() {
    fixture.badCredentials.credentials = {
      password: 'pass'
    };
    var data = {password: 'pass'};
    return doRequest(data, 400);
  });
});

describe('without any credentials', function () {
  it('should not works', function handler() {
    return doRequest({}, 400);
  });
});

function doRequest(fixture, expectCode, responseFuncCheck) {
  return h.request(h.url)
    .post('api/sessions')
    .form(fixture)
    .expect(expectCode)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(responseFuncCheck);
}

function apiCreateUser(fixture, expectCode, responseFuncCheck) {
  return h.request(h.url)
    .post(path.join('api', 'users'))
    .json(fixture)
    .expect(expectCode)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(responseFuncCheck);
}

function removeUserByEmail(email, callback) {
  return userModel.remove({'email.value': email}, callback);
}
