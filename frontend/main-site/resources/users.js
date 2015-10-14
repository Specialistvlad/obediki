angular.module('app').factory('usersResource', ['$resource', function($resource) {
    return $resource('/api/users/:userId');
  }
]);
