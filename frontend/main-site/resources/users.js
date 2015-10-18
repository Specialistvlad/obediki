angular.module('app').factory('usersResource', ['$resource', function($resource) {
    return $resource('/api/users/:userId', null, {
      createToken: {
        url: '/api/users/password/token',
        method: 'POST'
      }
    });
  }
]);

angular.module('app').factory('sessionsResource', ['$resource', function($resource) {
    return $resource('/api/sessions');
  }
]);
