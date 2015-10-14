angular.module('app').factory('ordersResource', ['$resource', function($resource) {
    return $resource('/api/orders/:orderId', null, {
      save: {
        method: 'PUT',
        isArray: false
      }
    });
  }
]);
