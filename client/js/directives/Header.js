'use strict';

angular.module('myApp.directives').directive('header', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/header.html',
    link: function(scope) {
    }
  }
});
