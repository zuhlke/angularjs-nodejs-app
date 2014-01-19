'use strict';

angular.module('myApp.controllers').controller('LoginController', function($scope) {

  $scope.errors = {extra: 'Hey'};

  var sendLogin = function(user) {
    console.log(user.email);
    console.log(user.password);
  };


  $scope.sendLogin = sendLogin;


});
