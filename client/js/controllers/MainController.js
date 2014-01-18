'use strict';

angular.module('myApp.controllers').controller('MainController', function($scope, $timeout, promiseTracker) {

  $scope.loadingTracker = promiseTracker('loadingTracker');

  var promise = $timeout(function() {
    alert('Delayed something!');
    }, 5000);

  $scope.loadingTracker.addPromise(promise);

  console.log($scope.loadingTracker.active());

});
