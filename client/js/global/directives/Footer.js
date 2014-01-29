'use strict';

// A simple directive adding a sticky footer to the view.
// The footer contains a spinner that shows 'Loading...'
// when loadingTracker.active() === true.
//
// Uses the angular-promise-tracker library
angular.module('myApp.global').directive('footer', function(loadingService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/footer.html',
    link: function(scope) {
      scope.loadingTracker = loadingService.getTracker();
    }
  }
});
