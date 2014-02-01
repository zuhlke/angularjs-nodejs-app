'use strict';

angular.module('myApp.userDetails').controller('UserDetailController', function($scope, $timeout, $location, userService) {

  $scope.editAccount = function(user) {
    userService.update(user).then(function(user) {
      $timeout(function() {
        alertify.success("Saved");
      });
    });
  }

  userService.getUser($routeParams.username).then(function(user) {
    $scope.user = user;
  });

});
