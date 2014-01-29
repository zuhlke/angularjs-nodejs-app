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

      scope.user = userService.getUser($routeParams.username);

    }
  }
});
