'use strict';

angular.module('myApp.controllers').controller('DashboardController', function($scope, $timeout, $log) {

  // Enable the new Google Maps visuals until it gets enabled by default.
  // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
  google.maps.visualRefresh = true;

  window.navigator.geolocation.getCurrentPosition(function(position) {
    $log.info('Received position from browser:' + position.coords.latitude + '/' + position.coords.longitude);
    $scope.$apply(function() {
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
    });
  });

  angular.extend($scope, {
    map: {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 14
    },
    markers: []
  });

  $timeout(function () {
    var markers = [ {
        latitude: 51.5205047,
        longitude: -0.1355364,
        showWindow: false
      }
    ];
    $scope.$apply(function() {
      $log.info('Setting markers');
      $scope.markers = markers;
    });
  }, 5000);

});
