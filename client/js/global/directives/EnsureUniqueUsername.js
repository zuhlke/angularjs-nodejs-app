'use strict';

angular.module('myApp.global').directive('ensureUniqueUsername', function($timeout, userService) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {

      //Wait 500ms after the user finished typing to make the call
      var waitTime = 500;

      //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
      var timeoutPromise;

      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise); //cancel previous timeout
      }

      modelCtrl.$parsers.unshift(function (inputValue) {
        var newValue = inputValue;
        timeoutPromise = $timeout(function () {
          userService.uniqueUsername(newValue).then(function() {
            modelCtrl.$setValidity('unique', false);
          }, function() {
            modelCtrl.$setValidity('unique', true);
          });
        }, waitTime);
        return inputValue;
      });

    }
  }
});
