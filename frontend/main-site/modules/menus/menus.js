angular.module('app').controller('menusCntrl', ['$scope', 'menusResource', function($scope, menusResource) {
  menusResource.query(function(data) {
    $scope.menus = data;
  });
}]);
