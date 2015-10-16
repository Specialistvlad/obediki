module.exports = {
     db: {
       url: 'mongodb://localhost:27017/order-dinner'
     },
     web: {
       port: 3000,
       listen: '0.0.0.0',
       host: 'localhost',
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
     userRoles: require('./user-roles')
   };
