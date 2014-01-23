angular.module('myApp.directives').directive('ensureUnique', function($http, userService) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {

      scope.$watch(attrs.ngModel, function() {
        /*
        $http({
          method: 'POST',
          url: '/api/check/' + scope.register.email,
          data: {'field': scope.register.email}
        }).success(function(data,status,headers,cfg) {
            c.$setValidity('unique', data.isUnique);
        }).error(function(data,status,headers,cfg) {
            c.$setValidity('unique', false);
        });
        */
        userService.checkUsername(scope.register.email);
      });
    }
  }
});
