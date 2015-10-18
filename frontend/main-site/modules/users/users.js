angular.module('app').controller('usersCntrl', [
          '$scope', 'usersResource',
  function($scope, usersResource) {
  update = function() {
    usersResource.query(function(data) {
      $scope.users = data;
    });
  }
  update();

  $scope.social = function (user, networkName) {
    return (user.social && !!user.social[networkName]);
  }

  $scope.socialLink = function (user, networkName) {
    if (!$scope.social(user, networkName)) {
      return '';
    }

    return 'http://' +
      (networkName === 'vkontakte' ? 'vk' : networkName) + '.com/' +
      user.social[networkName].profile.id;
  }
}]);
