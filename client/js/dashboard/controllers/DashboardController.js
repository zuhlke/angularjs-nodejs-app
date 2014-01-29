'use strict';

angular.module('myApp.dashboard').controller('DashboardController', function($scope, $timeout, $log) {

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
      zoom: 13
    },
    pubs: [],
    markers: [
      // London
      { latitude: 51.5205513, longitude: -0.1354548, showWindow: false, icon: 'img/zuhlke.png' },

      // Switzerland, Zurich
      { latitude: 47.4000411, longitude: 8.4434826, showWindow: false, icon: 'img/zuhlke.png' },

      // Switzerland, Bern
      { latitude: 46.94945, longitude: 7.44276, showWindow: false, icon: 'img/zuhlke.png' },

      // Austria
      { latitude: 48.242196, longitude: 16.384821, showWindow: false, icon: 'img/zuhlke.png' },

      // Germany, Frankfurt
      { latitude: 50.13076, longitude: 8.57092, showWindow: false, icon: 'img/zuhlke.png' },

      // Germany, Hamburg
      { latitude: 53.54274, longitude: 9.98800, showWindow: false, icon: 'img/zuhlke.png' },

      // Germany, Hannover
      { latitude: 52.39846, longitude: 9.77092, showWindow: false, icon: 'img/zuhlke.png' },

      // Germany, Munich
      { latitude: 48.14838, longitude: 11.53701, showWindow: false, icon: 'img/zuhlke.png' },

      // Belgrade
      { latitude: 44.81274, longitude: 20.41467, showWindow: false, icon: 'img/zuhlke.png' }
    ]
  });

});
