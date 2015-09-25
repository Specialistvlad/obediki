'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var unixtime = require('unix-timestamp');

var secret = 'asd1234567890-=fghjklzxcvbnm,.qwertyuiopasdfghjkl;';
var expireSeconds = 1000;
var expireResetPasswordSeconds = 60 * 60;

var schema = mongoose.Schema({
  credentials: {
    username: {
      type: String,
      required: false,
      match: /^[a-z0-9_-]{6,15}$/,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    reset: {
      token: String,
      createdAt: Number,
      expireAt: Number
    }
  },
  email: {
    value: {
      type: String,
      required: true,
      index: {unique: true},
      unique: true,
      match: /\S+@\S+\.\S+/,
      lowercase: true,
      trim: true
    },
    confirmation: {
      token: String,
      createdAt: Number,
      expireAt: Number,
      confirmedAt: Date
    }
  }
});

schema.methods.generateEmailToken = function generateEmailToken() {
  return new Promise(
    function(resolve, reject) {
      if (!this.email.value) {
        reject('email.value can\'t be undefined');
      }

      if (!this.email.confirmation) {
        this.email.confirmation = {};
      }
      this.email.confirmation.createdAt = unixtime.now();
      this.email.confirmation.expireAt = this.email.confirmation.createdAt + expireSeconds;

      var payload = {
        email: this.email.value,
        createdAt: this.email.confirmation.createdAt.toString(),
        expireAt: this.email.confirmation.expireAt.toString()
      };
      this.email.confirmation.token = jwt.encode(payload, secret);
      resolve(this.email.confirmation.token);
    }.bind(this));
};

schema.methods.confirmEmailToken = function generateEmailToken(token) {
  return new Promise(function(resolve, reject) {
      var payload = jwt.decode(token, secret);
      if (payload && token === this.email.confirmation.token) {
        this.email.confirmation.confirmedAt = new Date();
        delete this.email.confirmation.token;
        delete this.email.confirmation.createdAt;
        delete this.email.confirmation.expireAt;
        resolve(this);
      } else {
        reject(false);
      }
    }.bind(this));
};

schema.methods.createTokenForPasswordReset = function() {
  return new Promise(
    function(resolve) {
      var payload = {
        email: this.email.value,
        createdAt: unixtime.now(),
        expireAt: unixtime.now() + expireResetPasswordSeconds,
        salt: _.random()
      };
      var token = jwt.encode(payload, secret);
      payload.token = token;

      this.credentials.reset.push(payload);
      this.markModified('credentials.reset.push');
      //console.log(this.credentials.reset);
      resolve(token);
    }.bind(this));
};

schema.methods.checkResetPasswordToken = function(token) {
  return new Promise(
    function(resolve, reject) {
      var tokenObj = this.credentials.reset.filter(function(reset) {
        return reset.token === token;
      });
      if (!tokenObj.length) {
        reject('This token is not found');
      }
      tokenObj = tokenObj[0];
      var now = unixtime.now();
      var tokenIsOld = now > tokenObj.expireAt;
      if (tokenIsOld) {
        reject('Token expired');
      }
      resolve();
    }.bind(this));
};

schema.plugin(require('mongoose-timestamp'));
schema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('users', schema);
