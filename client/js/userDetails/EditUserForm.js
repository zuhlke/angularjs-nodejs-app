'use strict';

angular.module('myApp.userDetails').directive('editUserForm', function($routeParams, userService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/editUserForm.html',
    scope: {
      onSubmit: '&',
      formErrors: '='
    },
    link: function(scope, element, attrs, modelCtrl) {

      userService.getUser($routeParams.username).then(function(user) {
        scope.user = user;
      });

      scope.editAccount = function() {
        scope.onSubmit({user: scope.user});
      };

    }
  }
});
