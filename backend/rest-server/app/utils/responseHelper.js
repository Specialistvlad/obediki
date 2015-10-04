var http = require('http');
var util = require('util');
var _ = require('lodash');

var config = require('./../../config');

// List of available methods
// continue
// switchingProtocols
// processing
// ok
// created
// accepted
// nonAuthoritativeInformation
// noContent
// resetContent
// partialContent
// multiStatus
// multipleChoices
// movedPermanently
// movedTemporarily
// seeOther
// notModified
// useProxy
// temporaryRedirect
// badRequest
// unauthorized
// paymentRequired
// forbidden
// notFound
// methodNotAllowed
// notAcceptable
// proxyAuthenticationRequired
// requestTimeOut
// conflict
// gone
// lengthRequired
// preconditionFailed
// requestEntityTooLarge
// requestUriTooLarge
// unsupportedMediaType
// requestedRangeNotSatisfiable
// expectationFailed
// iMATeapot
// unprocessableEntity
// locked
// failedDependency
// unorderedCollection
// upgradeRequired
// preconditionRequired
// tooManyRequests
// requestHeaderFieldsTooLarge
// internalServerError
// notImplemented
// badGateway
// serviceUnavailable
// gatewayTimeOut
// httpVersionNotSupported
// variantAlsoNegotiates
// insufficientStorage
// bandwidthLimitExceeded
// notExtended
// networkAuthenticationRequired

function genericResponse(res, data, code) {
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
    template = _.merge({status: code + ' ' + http.STATUS_CODES[code]}, data);
    if (config.web.logErrorResponse) {
      console.info('\r\nResponse:', http.STATUS_CODES[code],
        util.inspect(template, false, null));
    }
  }
  res.status(code).json(template);
  return template;
}

_.forIn(http.STATUS_CODES, function(value, key) {
  module.exports[_.camelCase(value.toLowerCase())] = function(res, data) {
      return genericResponse(res, data, key);
    };
});
