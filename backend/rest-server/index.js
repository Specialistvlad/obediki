// Load configuration
var config = require('./config');
console.log('NODE_ENV=%s, isDevelopmentMode=%s, listenOn=%s, address=%s',
	config.env, config.develop, config.web.listen, config.web.address);

// Configuring mongo
require('./app/mongo')();

// Configuring express
require('./app/express')();
