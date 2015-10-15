angular.module('app').controller('signupCntrl',
        ['$rootScope', '$scope', 'usersResource',
function($rootScope, $scope, usersResource) {
  $scope.error = null;
  $scope.credentials = {
    email: 'admin2@example.com',
    password: 'test2test'
  };

  $scope.signup = function (credentials) {
    usersResource.save(credentials, function (user) {
      $scope.error = null;
    }, function (err) {
      $scope.error = err.data.message;
    });
  };

}]);
