angular.module('app').service('Session', function () {
  this.create = function (user) {
    this.user = user;
  };

  this.destroy = function () {
    this.user = null;
  };

  return this;
})

angular.module('app').factory('AuthService', function ($http, $location, Session) {
  function isAuthenticated() {
    return !!Session.user;
  }
  return {
    login: function (credentials) {
      return $http
        .post('/api/users/session', credentials)
        .then(function (res) {
          Session.create(res.data);
          $location.path('/');
        });
    },
    logout: function () {
      Session.destroy();
      $location.path('/');
    },
    isAuthenticated: isAuthenticated,
    checkRestrictions: function(event, next, current) {
      var logged = isAuthenticated();
      var toLoginPage = $location.path().indexOf('/login') === 0;

      if (toLoginPage && logged) {
        event.preventDefault();
        $location.path('/');
      } else if (!toLoginPage && !logged) {
          event.preventDefault();
          $location.path('/login');
      }
    }
    // ,
    // isAuthorized: function (authorizedRoles) {
    //   if (!angular.isArray(authorizedRoles)) {
    //     authorizedRoles = [authorizedRoles];
    //   }
    //   return (this.isAuthenticated() &&
    //     authorizedRoles.indexOf(Session.userRole) !== -1);
    // }
  };
});
