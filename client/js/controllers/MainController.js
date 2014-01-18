'use strict';

angular.module('myApp.controllers').controller('MainController', function($scope, userService) {

  userService.getUser().then(function(users) {
    console.log(users);
  });

});
