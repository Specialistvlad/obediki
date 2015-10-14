config = require('./../../config');
var http = require('http');
var util = require('util');
var _ = require('lodash');

module.exports = function genericResponse(res, code, data) {
  var template;

  if (typeof data === 'string') {
    data = { message: data};
  }
  if (code < 400) {
    template = data;

    if (config.web.logGoodResponse) {
      if (template) {
        console.info('\r\nResponse:', http.STATUS_CODES[code],
          util.inspect(template, false, null));
      }
    }
  } else {
    console.log(data);
    template = _.merge({}, data);
    if (config.web.logErrorResponse) {
      console.info('\r\nResponse:', http.STATUS_CODES[code],
        util.inspect(template, false, null));
    }
  }
  res.status(code).json(template);
  //return template;
};
