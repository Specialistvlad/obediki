angular.module('app').controller('orderCntrl', ['$scope', '$routeParams', 'menusResource',
  function($scope, $routeParams, menusResource) {
    $scope.daysOfWeek = ['Понедельник', 'Вторник', 'Среда' , 'Четверг', 'Пятница'];
    $scope._ = _;
    $scope.order = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    };

    menusResource.get({menuId: 'next-week'}, function(data) {
      $scope.menu = data;
    });

    // orderResource.get({}, function(data) {
    //    $scope.order = data;
    // });

    $scope.removeItem = function(orderItemId, dayIndex) {
      var orderItem = _.find($scope.order[dayIndex], {id: orderItemId});
      if (orderItem) {
        var deletedAlready = false;
        $scope.order[dayIndex] = _.remove($scope.order[dayIndex], function(itItem) {
          if (itItem.id && orderItem.id && itItem.id == orderItem.id && !deletedAlready) {
            deletedAlready = true;
            return false;
          } else {
            return true;
          }
        });

        var menuItem = _.find($scope.menu[dayIndex], {_id: orderItemId});
        var menuItems = _.filter($scope.order[dayIndex], function(n) {
          return n.id == orderItemId
        });

        if (menuItem && menuItems.length === 0) {
          menuItem.selected = false;
        }
      }
    };

    $scope.addItem = function(itemId, dayIndex) {
      var item = _.find($scope.menu[dayIndex], {_id: itemId});
      if (item) {
        item.selected = true;
        var orderItem = _.cloneDeep(item);
        orderItem.id = orderItem._id;
        delete orderItem._id;
        $scope.order[dayIndex].push(orderItem);
      }
    };

    $scope.orderSum = function(dayIndex) {
      return _.sum($scope.order[dayIndex], 'cost');
    };
}]);