angular.module('app').controller('ordersCntrl', [
          '$scope', 'ordersResource',
  function($scope, ordersResource) {
  update = function() {
    ordersResource.query(function(data) {
      $scope.list = data;
    });
  }
  update();
}]);
