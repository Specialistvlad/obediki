angular.module('app').controller('orderCntrl', ['$scope', '$routeParams', 'menusResource', 'ordersResource',
  function($scope, $routeParams, menusResource, ordersResource) {
    $scope.daysOfWeek = ['Понедельник', 'Вторник', 'Среда' , 'Четверг', 'Пятница'];
    $scope._ = _;
    $scope.order = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    };

    ordersResource.get({orderId: $routeParams.orderId}, function(data) {
       if (data._id) {
         $scope.order = data;
       }
    });

    $scope.orderSum = function(dayIndex) {
      return _.sum($scope.order[dayIndex], 'cost');
    };

    $scope.menuExists = function() {
        return !!$scope.order._id;
    };
}]);
