'use strict';

angular.module('myApp.userDetails').controller('UserDetailController', function($scope, $timeout, $location, userService) {

  $scope.submitUser = function(user) {

    userService.update(user).then(function(user) {
      $timeout(function() {
        alertify.success("Saved");
      });
    });

  }

});
