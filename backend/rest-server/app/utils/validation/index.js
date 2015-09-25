var _ = require('lodash');
var Promise = require('bluebird');
var objectPath = require('object-path');
var userDefined = require('./user-defined');

// This module extend all functions fron validator module and standartize error output
// How to use:
// var validator = new ValidatorHelper(data);
// validator.isEmail('<your json path to field>');
// validator.isCreditCard('<your json path to field>');
// return validator.promisify;

module.exports = function (source) {
  var err = new Error();
  this.message = 'Error';
  this.stack = err.stack;
  this.errors = [];
  this.source = source;

  remapMethods(userDefined, this);

  this.result = function() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      errors: this.errors
    }
  };

  this._isError = function() {
    return this.errors.length > 0;
  }

  this.promisify = function() {
    return new Promise(function(resolve, reject) {
      this._isError() ? reject(this.result()) : resolve(this.source);
    }.bind(this));
  }
};

function handler(name, func, path) {
  var args = [].slice.call(arguments).splice(3);
  var data = objectPath.get(this.source, path);
  args.unshift(data);
  var result = func.apply(this, args);
  if (result) {
    this.errors.push(pathValidationError(result, path, data, name, args));
  }
  return !result;
}

function remapMethods(from, to, bindTo) {
  _.forIn(from, function (value, key) {
    if (_.isFunction(value)) {
      to[key] = handler.bind(bindTo ? bindTo : to, key, value);
    }
  });
}

function pathValidationError(message, path, value, validatorName, validatorArguments) {
  return {
    message: message,
    path: path,
    validatorName: validatorName,
    validatorArguments: validatorArguments
  };
}
