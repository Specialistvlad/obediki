angular.module('app', ['ngRoute', 'ngResource', 'ngFileUpload', 'angularUtils.directives.dirPagination'])

// configure our routes
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/summary', { templateUrl: 'templates/summary.html', controller: 'summaryCntrl'})
  .when('/order', { templateUrl: 'templates/order.html', controller: 'orderCntrl'})
  .when('/menus', { templateUrl: 'templates/menus.html', controller: 'menusCntrl'})
  .when('/menus/:menuId', { templateUrl: 'templates/menu.html', controller: 'menuCntrl'})
  .when('/login', { templateUrl: 'templates/login.html', controller: 'loginCntrl'})
  .otherwise({redirectTo: '/summary'});

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
})
.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('templates/pagination.html');
})
.constant('_', window._)
.run(function($rootScope, AuthService) {
  $rootScope.$on('$routeChangeStart', AuthService.checkRestrictions);
});
