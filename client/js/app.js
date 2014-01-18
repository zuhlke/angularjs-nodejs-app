'use strict';

angular.module('myApp', [
    'ajoslin.promise-tracker',
    'angulartics',
    'angulartics.google.analytics',
    'ngRoute',
    'myApp.services',
    'myApp.filters',
    'myApp.directives',
    'myApp.controllers'
]).config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
}).config(function($analyticsProvider) {
  // turn off automatic tracking
  $analyticsProvider.virtualPageviews(false);
});

angular.module('myApp.services', []);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', [ 'ajoslin.promise-tracker', 'angulartics.google.analytics' ]);
angular.module('myApp.filters', []);