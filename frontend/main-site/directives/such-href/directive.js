angular.module('app').directive('suchHref', ['$location', function ($location) {
  return{
    restrict: 'A',
    link: function (scope, element, attr) {
      element.attr('style', 'cursor:pointer');
      element.on('click', function(){
        $location.url(attr.suchHref)
        scope.$apply();
      });
    }
  }
}]);
