module.exports = {
     db: {
       url: 'mongodb://localhost:27017/obediki-develop'
     },
     web: {
       port: 5000,
       listen: '0.0.0.0',
       host: 'localhost',
       address: 'http://localhost:5000/',
       publicDir: '../../../build/',
       logGoodResponse: false,
       logErrorResponse: true,
       sessionKey : 'session',
       cookieKey : 'cookie'
     },
     frontend: {
       siteRoutes: [
         '/public/:tabName?',
         '/summary',
         '/next-week-order',
         '/menus/:id?',
         '/users/:id?',
         '/order',
         '/orders/:id?',
       ]
     },
     userRoles: require('./user-roles'),
   };
