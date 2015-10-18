angular.module('app').service('Session', function (sessionsResource, $cookies) {
  this.create = function (user) {
    this.user = user;
    return user;
  };

  this.destroy = function () {
    this.user = null;
  };

  this.restore = function () {
    try {
      var user = JSON.parse($cookies.get('user'));
      if (user) {
        this.create(user);
      }
    } catch (e) {
      this.user = null;
    } finally {
      console.log(this.user ? 'User found!' : 'Can\'t find user');
    }
  };
})

angular.module('app').factory('AuthService', function (sessionsResource, $location, Session) {
  function isAuthenticated() {
    return !!Session.user;
  }
  return {
    login: function (credentials) {
      return sessionsResource.save(credentials).$promise
        .then(function (user) {
          if (!user) {
            return $q.reject('Unknown error, user not found!');
          }

          Session.create(user);
          $location.path('/');
          return Session.user;
        });
    },
    logout: function () {
      return sessionsResource.delete().$promise
        .then(function (user) {
          if (!user) {
            return $q.reject('Unknown error, can\'t! logout');
          }

          Session.destroy();
          $location.path('/');
          return Session.user;
        });
    },
    isAuthenticated: isAuthenticated,
    checkRestrictions: function(event, next, current) {
      var logged = isAuthenticated();
      var toPublicPage = $location.path().indexOf('/public') === 0;

      if (toPublicPage && logged) {
        event.preventDefault();
        $location.path('/');
      } else if (!toPublicPage && !logged) {
          event.preventDefault();
          $location.path('/public');
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
