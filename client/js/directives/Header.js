'use strict';

angular.module('myApp.directives').directive('header', function(Auth) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/header.html',
    link: function(scope) {

      scope.isLoggedIn = Auth.isLoggedIn();

    }
  }
});
