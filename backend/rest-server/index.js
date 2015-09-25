// Load configuration
require('./config');

// Configuring mongo
require('./app/mongo')();

// Configuring express
require('./app/express')();

// require('./app/modules/menus/service').createMenu('menu.xls')
//   .then(function (value) {
//     console.log('success');
//   }, function (value) {
//     console.log('error', value);
//   });
