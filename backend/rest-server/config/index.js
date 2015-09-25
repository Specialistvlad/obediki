var _ = require('lodash');

var config = require('./default');
config.env = process.env.NODE_ENV || 'development';
config.develop = !!((config.env === 'staging') || 'development');

var newConfig = require('./'+config.env);
if (newConfig) {
    config = _.merge(config, newConfig, function(a, b) {
      if (_.isArray(a)) { return a.concat(b); }
    });
}

config.web.address = 'http://' + config.web.host + ':' + config.web.port+'/';
console.log('NODE_ENV=%s, isDevelopmentMode=%s, directory=', config.env, config.develop, config.web.publicDir);
module.exports = config;
