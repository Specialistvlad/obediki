angular.module('app').controller('menusCntrl', [
          '$scope', '$timeout', 'menusResource', 'Upload',
  function($scope, $timeout, menusResource, Upload) {
  $scope.startDate = new Date();

  update = function() {
    menusResource.query(function(data) {
      $scope.menus = data;
    });
  }

  $scope.removeItem = function(id) {
    swal({
      title: "Вы уверены?",
      text: "Восстановить это меню уже не получиться",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Да, удали его!",
      closeOnConfirm: false
    }, function () {
      $scope.message = null;
      menusResource.remove({menuId: id}, function(data) {
        swal("Удаление", "Успешно!", "success");
        update();
      }, function(err) {
        swal("Ошибка", 'Что-то пошло не так :(', "error");
      });
    });
  }

  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    if (!file) {
      return;
    }
    $scope.startDate.setHours(23, 59, 59, 999);
    file.upload = Upload.upload({
        url: '/api/menus',
        data: {
          file: file,
          dateFrom: $scope.startDate
        }
    });

    file.upload.then(function (response) {
      swal("Загрузка файла", "Успешно!", "success");
      update();
    }, function (err) {
      swal("Ошибка", 'Что-то пошло не так'+(err.data.message?(': ')+err.data.message:''), "error");
    }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }

  $('input[name="daterange"]').daterangepicker({
  "singleDatePicker": true,
  "showWeekNumbers": true,
  "dateLimit": {
      "days": 1
  },
  "linkedCalendars": false,
  "startDate": $scope.startDate,
  "opens": "center"
  }, function(start, end, label) {
    $scope.startDate = end.toDate();
    // console.log('New date range selected: ' + $scope.startDate.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });

  update();
}]);
