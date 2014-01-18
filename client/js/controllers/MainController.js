'use strict';

angular.module('myApp.controllers').controller('MainController', function($scope, promiseTracker, userService) {

  $scope.loadingTracker = promiseTracker('loadingTracker');

  userService.getUser('loadingTracker').then(function(users) {
    console.log(users);
  });

});
