'use strict';

angular.module('myApp.global').directive('appVersion', ['version', function(version) {

  return function(scope, elm) {
    elm.text(version);
  };

}]);
