'use strict';

angular.module('myApp.global').factory('loadingService', function(promiseTracker) {

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
