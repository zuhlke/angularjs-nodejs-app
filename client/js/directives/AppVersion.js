'use strict';

// A simple directive displaying the version number of the currently running application
angular.module('myApp.directives').directive('appVersion', ['version', function(version) {
  return function(scope, elm) {
    elm.text(version);
  };
}]);
