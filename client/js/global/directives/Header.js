'use strict';

angular.module('myApp.global').directive('header', function(Auth) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/header.html',
    link: function(scope) {

      scope.isLoggedIn = Auth.isLoggedIn();

    }
  }
});
