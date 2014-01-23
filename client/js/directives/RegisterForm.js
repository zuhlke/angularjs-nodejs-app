'use strict';

// A directive applying DOM modifications in the link function using jQuery.
// Makes the pin moves on the LoginForm background.

// Also contains our view model.
angular.module('myApp.directives').directive('registerForm', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/registerForm.html',
    scope: {
      onSubmit: '&',
      formErrors: '='
    },
    compile: function(scope) {
    },
    link: function(scope) {

      scope.submitAccount = function() {
        scope.onSubmit({user: scope.register});
      };

    }
  }
});
