var config = require('./../config/');
var helpers = require('./helpers');
var mongoose = require('mongoose');
  console.log('Api testing on %s', helpers.url);

before(function (done) {
  mongoose.connect(config.db.url);
  mongoose.connection.once('open', function (callback) {
    //console.log('Server connected to the Database:', config.db.url, '\n');
    done();
  });
  mongoose.connection.on('err', function (callback) {
    console.error('Can\'t to the Database:', config.db.url, '\n');
    done(err);
  });
});

//helpers.importTest('example', __dirname);
helpers.importTest('user', __dirname);

after(function (done) {
    done();
});
