angular.module('app').factory('ordersResource', ['$resource', function($resource) {
    return $resource('/api/v1/orders');
  }
]);
