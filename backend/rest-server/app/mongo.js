var config = require('./../config');
var mongoose = require('mongoose');

var options = {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 10000
      }
    }
  };

module.exports = function() {
  // Connect to our mongoDB database. Url value is storage in config
  mongoose.connect(config.db.url, options);
  mongoose.connection.once('open', function() {
    console.log('Server connected to the', config.db.url, '\n');
  });
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
};