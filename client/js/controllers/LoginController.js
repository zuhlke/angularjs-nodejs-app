'use strict';

angular.module('myApp.controllers').controller('LoginController', function($scope, $log, authenticationService) {

  $scope.errors = {};

  var sendLogin = function(user) {
    authenticationService.authenticate(user).then(function() {
      $log.debug('User authenticated successfully');
    }, function(resp) {
      $log.debug('There was an error authenticating the user');
      $scope.errors.extra = 'Invalid username or password';
    });
  };

  $scope.sendLogin = sendLogin;

});
