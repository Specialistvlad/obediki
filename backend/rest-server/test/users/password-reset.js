var path = require('path');

var h = require('./../helpers');
//var fixture = require('./fixture');
var userModel = h.importModel('users', __dirname);
var promise = require('bluebird');
//var service = require('../../server/modules/users/service.js');
var unixtime = require('unix-timestamp');

var fixture = {
  signup: {
    credentials: {
      username: 'test-user-name2',
      password: 'test-password2'
    },
    email: {
      value: 'same_email@example.com'
    }
  }
};

describe('create token', function () {
  var user;
  before(function () {
    return removeUserByEmail(fixture.signup.email.value)
      .then(apiCreateUser(fixture.signup, 200))
      .then(function (res) {
        user = res.body;
        return new promise(function (resolve) {
          resolve(user);
        });
      });
  })


  //       user.credentials.password.should.not.equal(newPassword);
  //       return h.request(h.url)
  //         .post(path.join('v1', '/users/credentials/password/token'))
  //         .json({email: email})
  //         .expect(200)
  //         .expect('Content-Type', 'application/json; charset=utf-8')
  //         .expect(function(res) {
  //           res.should.equal('Reset password instruction is sent to email ' + email);
  //         })
  //         .end();
  //     })
  //     .then(function(){
  //       return service.findByEmail(email)
  //     })
  //     .then(function(user) {
  //       token = user.credentials.reset[user.credentials.reset.length - 1].token;
  //       var url = '/users/credentials/password/token/validation/' + token;
  //       h.request(h.url)
  //         .get(path.join('v1', url))
  //         .expect('Content-Type', 'application/json; charset=utf-8')
  //         .expect(200)
  //         .end();
  //       return new Promise(function(resolve){
  //         resolve(token);
  //       });
  //     })
  // });

  it('should works', function handler() {
    return h.request(h.url)
      .post('api/users/password/token')
      .json({email: fixture.signup.email.value})
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end()
  });

  // it('should not work if token is expired', function handler() {
  //   // Set token expireAt
  //   return changeResetTokenExpire()
  //   .then(function() {
  //     return h.request(h.url)
  //       .put(path.join('v1', '/users/credentials/password'))
  //       .json({password: newPassword, token: token})
  //       .expect('Content-Type', 'application/json; charset=utf-8')
  //       .expect(400)
  //       .expect(function(res) {
  //         res.should.deepEqual({ description: 'Token is required', status: '400 Bad Request' });
  //       })
  //       .end()
  //   })
  //   .then(function() {
  //     service.findByEmail(email)
  //       .then(function(user) {
  //         user.credentials.password.should.equal(newPassword);
  //       });
  //   })
  // });
});



function apiCreateUser(fixture, expectCode) {
  return h.request(h.url)
    .post(path.join('api', 'users'))
    .json(fixture)
    .expect(expectCode)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end();
}

function removeUserByEmail(email, callback) {
  return userModel.remove({'email.value': email}, callback);
}

function changeResetTokenExpire() {
  return new Promise(function(resolve, reject) {
    userModel.update({'credentials.reset.token': token},
      {$set: {'credentials.reset.token.expireAt': unixtime.now()}}, function(err) {
        if (err) {
          return reject(err);
        }
        return resolve();
      }
    );
  })
}
