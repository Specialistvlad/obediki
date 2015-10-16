angular.module('app').controller('publicFormCntrl',
        ['$rootScope', '$scope', '$routeParams', 'AuthService', 'usersResource',
function($rootScope, $scope, $routeParams, AuthService, usersResource) {
  $scope.tab = $routeParams.tabName ? $routeParams.tabName : 'signin';

  $scope.isSelectedTab = function (tabName) {
    return $scope.tab === tabName;
  };

  $scope.selectTab = function (tabName) {
    $scope.tab = tabName;
  };

  $scope.error = null;
  $scope.data = {
    signin: {
      email: 'admin@example.com',
      password: 'testtesttest'
    },
    signup: {
      email: 'newuser@example.com',
      password: 'testtesttest'
    },
    restore: {}
  };

  $scope.signin = function () {
    AuthService.login($scope.data.signin).then(function (user) {
      $scope.error = null;
      $scope.setCurrentUser(user);
    }, function (res) {
      $scope.error = res.data.message;
    });
  };

  $scope.signup = function () {
    usersResource.save($scope.data.signup, function (user) {
      $scope.error = null;
    }, function (res) {
      $scope.error = res.data.message;
    });
  };

  $scope.restore = function () {
    console.log('asd');
    usersResource.createToken($scope.data.restore, function (user) {
      $scope.error = null;
    }, function (res) {
      $scope.error = res.data.message;
    });
  };
}]);
