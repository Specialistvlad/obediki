var config = require('./../config');
var mongoose = require('mongoose');
var user = require('./modules/users/service');

function createAdmin () {
  user.createIfNotExists({
    email: 'admin@example.com',
    password: 'testtest',
    role: 'admin'
  });
}

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
    createAdmin();
  });
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
};
