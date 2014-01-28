'use strict';

angular.module('myApp.controllers').controller('LoginController', function($scope, $location, userService) {

  $scope.errors = {};

  $scope.login = function(user) {
    userService.login(user).then(function() {
      $location.path('/dashboard');
    }, function(resp) {
      $scope.errors.extra = 'Invalid username or password';
    });
  };

});
