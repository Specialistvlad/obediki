var langs = require('./langs/enum');
var _ = require('lodash');

var defaultLang = 'eng';

function findValue (key, lang) {
  return this[lang ? lang : defaultLang][this.keys.indexOf(key)];
}

function getList (lang) {
  return this[(lang ? lang : defaultLang)+'List'];
}

function prepareList (self) {
  langs.forEach(function (lang) {
    self[lang+'List'] = {};
    self.keys.forEach(function (key) {
      if (self[lang])
        self[lang+'List'][key] = self[lang][self.keys.indexOf(key)];
    });
  });
}

module.exports = function (_enum, dict) {
  _.merge(this, dict);
  this.keys = _enum;
  this.get = findValue.bind(this);
  this.list = getList.bind(this);
  prepareList(this);
};
