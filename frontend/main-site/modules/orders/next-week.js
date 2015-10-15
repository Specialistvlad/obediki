angular.module('app').controller('nextWeekOrderCntrl', ['$scope', '$routeParams', 'menusResource', 'ordersResource',
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
    $scope.menu = {};

    menusResource.get({menuId: 'next-week'}, function(data) {
      $scope.menu = data;
    });

    ordersResource.get({orderId: 'next-week'}, function(data) {
       if (data._id) {
         $scope.order = data;
         $scope.highlightItems();
       }
    });

    $scope.menuExists = function() {
        return !!$scope.menu._id;
    };

    $scope.highlightItems = function() {
      for (var i = 0; i < 5; i++) {
        $scope.order[i].map(function (it) {
          var menuItem = _.find($scope.menu[i], {_id: it.id});
          if (menuItem) {
            menuItem.selected = true;
          }
        })
      }
    }

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
        ordersResource.save({orderId: 'next-week'}, $scope.order);
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
        ordersResource.save({orderId: 'next-week'}, $scope.order);
      }
    };

    $scope.orderSum = function(dayIndex) {
      return _.sum($scope.order[dayIndex], 'cost');
    };
}]);
