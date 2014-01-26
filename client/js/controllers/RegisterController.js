'use strict';

angular.module('myApp.controllers').controller('RegisterController', function($scope, $location, authenticationService) {

  $scope.errors = {};

  var createUser = function(user) {
    authenticationService.createUser(user).then(function() {
      $location.path('/dashboard');
    }, function(resp) {
      $scope.errors.extra = 'There was an error creating the user';
    });

  };

  $scope.createUser = createUser;

});
