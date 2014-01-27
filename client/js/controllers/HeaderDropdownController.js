'use strict';

angular.module('myApp.controllers').controller('HeaderDropdownController', function($scope, $location, Auth) {

  function logout() {
    Auth.logout();
    $location.path('/');
  };

  var menuClick = function(cmd) {
    if (cmd === 'LOGOUT') {
      logout();
    }
  };

  $scope.username = Auth.getUsername();
  $scope.items = [ {cmd: 'LOGOUT', text: 'Logout'} ];
  $scope.menuClick = menuClick;

});
