'use strict';

angular.module('myApp.controllers').controller('LoginController', function($scope, $log, userService) {

  $scope.errors = {};

  var login = function(user) {
    userService.login(user).then(function() {
      $log.debug('User authenticated successfully');
    }, function(resp) {
      $log.debug('There was an error authenticating the user');
      $scope.errors.extra = 'Invalid username or password';
    });
  };

  $scope.login = login;

});
