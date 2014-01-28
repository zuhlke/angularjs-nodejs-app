'use strict';

angular.module('myApp.controllers').controller('HeaderDropdownController', function($scope, $location, Auth) {

  $scope.username = Auth.getUsername();

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

});
