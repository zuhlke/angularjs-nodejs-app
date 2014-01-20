'use strict';

angular.module('myApp.controllers').controller('LoginController', function($scope, authenticationService) {

  $scope.errors = {};

  var sendLogin = function(user) {
    authenticationService.authenticate(user).then(function() {
      console.log('User authenticated');
    }, function(resp) {
      $scope.errors.extra = 'Invalid username or password';
      console.log('Error with status code', resp.status);
    });
  };

  $scope.sendLogin = sendLogin;

});
