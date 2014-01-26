'use strict';

angular.module('myApp.controllers').controller('RegisterController', function($scope, $log, authenticationService) {

  $scope.errors = {};

  var createUser = function(user) {
    authenticationService.createUser(user).then(function() {
      $log.debug('User created successfully');
    }, function(resp) {
      $log.debug('There was an error creating the user');
      $scope.errors.extra = 'There was an error creating the user';
    });

  };

  $scope.createUser = createUser;

});
