angular.module('app').controller('usersCntrl', [
          '$scope', 'usersResource',
  function($scope, usersResource) {
  update = function() {
    usersResource.query(function(data) {
      $scope.users = data;
    });
  }
  update();
}]);
