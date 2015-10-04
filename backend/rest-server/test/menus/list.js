var path = require('path');
var a = require('chai').assert;

var h = require('./../helpers');
var userModel = h.importModel('menus');

describe('', function () {
  it('should works', function handler() {
    return doRequest('', 200, function (err, res) {
      //TODO Delete _id from both source and expected
      //TODO Compare objects
      //a.deepEqual(res.body, expectedObject);
    });
  });

  //TODO Delete menu after checking
  // after(function () {
  //   return removeMenuById();
  // });
});

describe('with corrupt file', function () {
  it('should not works', function handler() {
    return doRequest("corrupt-file-import-source.xls", 400, function (err, res) {
      var body = JSON.parse(res.body);
      a.isDefined(body);
      a.isString(body.message);
    });
  });
});

function doRequest(fixture, expectCode, callback) {
  return h.request(h.url)
    .get(path.join('api', 'menus'))
    .json()
    .expect(expectCode && (typeof expectCode !== 'function') ? expectCode : 200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(callback);
}
