angular.module('app').factory('menusResource', ['$resource', function($resource) {
    return $resource('/api/menus/:menuId');
  }
]);
