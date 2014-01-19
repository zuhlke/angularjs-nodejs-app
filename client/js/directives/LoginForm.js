'use strict';

// A directive applying DOM modifications in the link function using jQuery.
// Makes the pin moves on the LoginForm background.
angular.module('myApp.directives').directive('loginForm', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/loginForm.html',
    link: function(scope) {
      $('.loginBanner').mousemove(function(e) {

        var newPosition = parseInt(e.pageX/8) + "px "
          + parseInt(e.pageY/12) + "px, "
          + parseInt(e.pageX/15) + "px "
          + parseInt(e.pageY/15) + "px, "
          + parseInt(e.pageX/30) + "px "
          + parseInt(e.pageY/30) + "px";

        $('.loginBanner').css('background-position', newPosition);

      });

    }
  }
});
