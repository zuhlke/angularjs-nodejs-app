'use strict';

angular.module('myApp.services').factory('loadingService', function(promiseTracker) {

  var trackerId = 'loadingTracker';
  var loadingTracker = promiseTracker(trackerId);

  return {

    getTracker: function() {
      return loadingTracker;
    },

    getTrackerId: function() {
      return trackerId;
    }

  }

});
