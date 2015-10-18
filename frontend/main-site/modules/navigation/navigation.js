angular.module('app').controller('NavigationController', [
  '$scope', 'AuthService', 'Session',
  function($scope, AuthService, Session) {
    $scope.auth = AuthService;
    $scope.user = Session.user;
  }
]);
