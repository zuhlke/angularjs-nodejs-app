'use strict';

// A directive applying DOM modifications in the link function using jQuery.
// Makes the pin moves on the LoginForm background.

// Also contains our view model.
angular.module('myApp.directives').directive('loginForm', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/loginForm.html',
    scope: {
      onSubmit: '&',
      formErrors: '='
    },
    link: function(scope) {

      var loginBackgroundClassName = 'loginBackground';

      function setLoginBackground() {
        $('body').addClass(loginBackgroundClassName);
      }

      function removeLoginBackground() {
        $('body').removeClass(loginBackgroundClassName);
      }

      function addMouseMove() {
        $('body').mousemove(transitionBackground);
      }

      function removeMouseMove() {
        $('body').off('mousemove');
      }

      function transitionBackground(e) {
        var newPosition = parseInt(e.pageX/8) + "px "
          + parseInt(e.pageY/12) + "px, "
          + parseInt(e.pageX/15) + "px "
          + parseInt(e.pageY/15) + "px, "
          + parseInt(e.pageX/30) + "px "
          + parseInt(e.pageY/30) + "px";
        $('body').css('background-position', newPosition);
      }

      function cleanup() {
        removeLoginBackground();
        removeMouseMove();
      }

      setLoginBackground();
      addMouseMove();

      scope.submitLogin = function() {
        scope.onSubmit({user: scope.login});
      };

      scope.$on('$destroy', cleanup);

    }
  }
});
