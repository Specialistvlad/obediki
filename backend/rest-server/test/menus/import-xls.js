var path = require('path');
var fs = require('fs');
var a = require('chai').assert;

var h = require('./../helpers');
var model = h.importModel('menus');

describe('with correct file', function () {
  var expectedObject = require('./fixture/correct-file-import-expected.json');
  var menuId;

  it('should works', function handler() {
    return doRequest("correct-file-import-source.xls", 200, function (err, res) {
      var res = JSON.parse(res.body);
      a.isDefined(res);
      a.isDefined(res._id);
      menuId = res._id;
      //TODO Delete _id from both source and expected
      //TODO Compare objects
      //a.deepEqual(res.body, expectedObject);
    });
  });

  after(function () {
    return model.removeById(menuId);
  });
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
    .post(path.join('api', 'menus'))
    .headers({'content-type': 'multipart/form-data'})
    .multipart([{
        'Content-Disposition': 'form-data; name="file"; filename="menu.xls"',
        'Content-Type': 'application/xls',
        body: fs.readFileSync(path.resolve(__dirname, "./fixture/"+fixture))
      }])
    .expect(expectCode ? expectCode : 200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(callback);
}
