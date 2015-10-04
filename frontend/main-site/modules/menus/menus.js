angular.module('app').controller('menusCntrl', [
          '$scope', '$timeout', 'menusResource', 'Upload',
  function($scope, $timeout, menusResource, Upload) {
  $scope.message = 'Выберите xls файл с меню';
  $scope.update = function() {
    menusResource.query(function(data) {
      $scope.menus = data;
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
      $scope.update();
    }, function (err) {
      $scope.message = err.data.message;
    }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
  $scope.update();
}]);
