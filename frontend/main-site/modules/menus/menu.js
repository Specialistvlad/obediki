angular.module('app').controller('menuCntrl', ['$scope', '$routeParams', 'menusResource',
  function($scope, $routeParams, menusResource) {
    $scope.daysOfWeek = ['Понедельник', 'Вторник', 'Среда' , 'Четверг', 'Пятница'];

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    menusResource.get({menuId: $routeParams.menuId}, function(data) {
      $scope.menu = data;
    });
}]);
