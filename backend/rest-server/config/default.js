module.exports = {
     db: {
       url: 'mongodb://localhost:27017/order-dinner'
     },
     web: {
       port: 3000,
       listen: 'localhost',
       host: 'localhost',
       publicDir: '../../../build/',
       logGoodResponse: false,
       logErrorResponse: true,
       sessionKey : 'session',
       cookieKey : 'cookie'
     },
     frontend: {
       siteRoutes: [
         '/login',
         '/summary',
         '/menus/:id?',
         '/users/:id?',
         '/order',
       ]
     },
     userRoles: require('./user-roles')
   };
