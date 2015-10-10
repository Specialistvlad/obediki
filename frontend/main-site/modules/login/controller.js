angular.module('app').controller('loginCntrl',
        ['$rootScope', '$scope', 'AuthService',
function($rootScope, $scope, AuthService) {
  $scope.error = null;
  $scope.credentials = {
    email: 'admin@example.com',
    password: 'testtest'
  };

  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $scope.error = null;
      $scope.setCurrentUser(user);
    }, function (err) {
      $scope.error = err.data.message;
    });
  };

}]);
