angular.module('app').controller('menuCntrl', ['$scope', '$routeParams', 'menusResource',
  function($scope, $routeParams, menusResource) {
    $scope.daysOfWeek = ['Понедельник', 'Вторник', 'Среда' , 'Четверг', 'Пятница'];
    $scope.menu = {};
    $scope.message = null;

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.daySize = function(key) {
      return $scope.menu[key] && $scope.menu[key].length ? $scope.menu[key].length : 0;
    }

    $scope.approveMenu = function() {
      $scope.menu.seen = true;
      $scope.menu.approved = true;
      $scope.message = null;
      menusResource.save({menuId: $scope.menu._id}, $scope.menu, function(data) {
      }, function(err) {
        $scope.message = 'Что-то пошло не так :('
      });
    }

    $scope.rejectMenu = function() { 
      $scope.menu.seen = true;
      $scope.menu.approved = false;
      $scope.message = null;
      menusResource.save({menuId: $scope.menu._id}, $scope.menu, function(data) {
      }, function(err) {
        $scope.message = 'Что-то пошло не так :('
      });
    }

    $scope.classForAlert = function() {
      return $scope.seen ?
        ($scope.approved ? 'alert-success' : 'alert-danger') : 'alert-warning';
    }

    menusResource.get({menuId: $routeParams.menuId}, function(data) {
      $scope.menu = data;
      $scope.menu.seen = false;
    });
}]);
