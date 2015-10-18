angular.module('app').controller('publicFormCntrl',
        ['$window', '$rootScope', '$scope', '$routeParams', 'AuthService', 'usersResource',
function($window, $rootScope, $scope, $routeParams, AuthService, usersResource) {
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
      //email: 'admin@example.com',
      //password: 'testtesttest'
    },
    signup: {
      // name: 'My username',
      // email: 'newuser@example.com',
      // password: 'testtesttest'
      name: '',
      email: '',
      password: ''
    },
    restore: {}
  };

  $scope.signin = function () {
    $scope.error = null;
    AuthService.login($scope.data.signin).catch(function (res) {
      $scope.error = res.data.message;
    });
  };

  $scope.signup = function () {
    usersResource.save($scope.data.signup, function (user) {
      $scope.error = null;
      $scope.message = 'User "'+$scope.data.signup.email+'" has been created!'
      $scope.data.signin.email = '';
      $scope.data.signin.password = '';
      $scope.selectTab('signin');
    }, function (res) {
      $scope.error = res.data.message;
    });
  };

  $scope.restore = function () {
    usersResource.createToken($scope.data.restore, function (user) {
      $scope.error = null;
    }, function (res) {
      $scope.error = res.data.message;
    });
  };

  $scope.social = function (networkName) {
    $window.location.href = 'api/auth/'+networkName;
  }
}]);
