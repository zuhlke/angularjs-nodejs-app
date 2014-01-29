'use strict';

angular.module('myApp.global').controller('HeaderDropdownController', function($scope, $location, Auth) {

  $scope.username = Auth.getUsername();

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

});
