'use strict';

// A simple directive adding a sticky footer to the view.
// The footer contains a spinner that shows 'Loading...'
// when loadingTracker.active() === true.
//
// Uses the angular-promise-tracker library
angular.module('myApp.directives').directive('footer', function(loadingService) {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'views/footer.html',
    link: function(scope) {
      scope.loadingTracker = loadingService.getTracker();
    }
  }
});
