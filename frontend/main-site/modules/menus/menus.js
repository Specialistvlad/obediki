angular.module('app').controller('menusCntrl', [
          '$scope', '$timeout', 'menusResource', 'Upload',
  function($scope, $timeout, menusResource, Upload) {
  $scope.message = '';
  update = function() {
    menusResource.query(function(data) {
      $scope.menus = data;
    });
  }

  $scope.removeItem = function(id) {
    $scope.message = null;
    menusResource.remove({menuId: id}, function(data) {
      update();
    }, function(err) {
      $scope.message = 'Что-то пошло не так :('
    });
  }

  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    if (!file) {
      return;
    }
    file.upload = Upload.upload({
        url: '/api/menus',
        data: {file: file}
    });

    file.upload.then(function (response) {
      $scope.message = 'Файл успешно загружен';
      update();
    }, function (err) {
      $scope.message = err.data.message;
    }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
  update();
}]);
