'use strict';

angular.module('myApp', [
    'ajoslin.promise-tracker',
    'restangular',
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
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      })
      .otherwise({
        redirectTo: '/'
      });

}).config(function($analyticsProvider) {

    // turn off virtual page tracking
    $analyticsProvider.virtualPageviews(false);

}).config(function(RestangularProvider) {

    // set's the base path for all API calls to '/api/v1'
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRestangularFields({
      selfLink: 'linkHref' // the attribute in our documents to link to themselves
    });

});

angular.module('myApp.services', [ 'ajoslin.promise-tracker', 'restangular' ]);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', [ 'angulartics.google.analytics' ]);
angular.module('myApp.filters', []);