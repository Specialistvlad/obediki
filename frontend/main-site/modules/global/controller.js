angular.module('app').controller('globalController', function ($rootScope, $scope, AuthService) {
  $scope.currentUser = null;
  $scope.isAuthenticated = AuthService.isAuthenticated;
  $scope.logout = AuthService.logout;
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    // console.log(user);
  };
});
