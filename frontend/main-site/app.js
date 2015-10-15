angular.module('app', ['ngRoute', 'ngResource', 'ngCookies', 'ngFileUpload', 'angularUtils.directives.dirPagination'])

// configure our routes
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', { templateUrl: 'templates/summary.html', controller: 'summaryCntrl'})
  .when('/next-week-order', { templateUrl: 'templates/next-week.html', controller: 'nextWeekOrderCntrl'})
  .when('/menus', { templateUrl: 'templates/menus.html', controller: 'menusCntrl'})
  .when('/menus/:menuId', { templateUrl: 'templates/menu.html', controller: 'menuCntrl'})
  .when('/orders', { templateUrl: 'templates/orders.html', controller: 'ordersCntrl'})
  .when('/orders/:orderId', { templateUrl: 'templates/order.html', controller: 'orderCntrl'})
  .when('/users', { templateUrl: 'templates/users.html', controller: 'usersCntrl'})
  .when('/users/:userId', { templateUrl: 'templates/user.html', controller: 'userCntrl'})
  .when('/login', { templateUrl: 'templates/login.html', controller: 'loginCntrl'})
  .when('/signup', { templateUrl: 'templates/signup.html', controller: 'signupCntrl'})
  .otherwise({redirectTo: '/'});

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
})
.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('templates/pagination.html');
})
.constant('_', window._)
.run(function($rootScope, Session, AuthService) {
  Session.restore();
  $rootScope.$on('$routeChangeStart', AuthService.checkRestrictions);
});
