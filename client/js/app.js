'use strict';

angular.module('myApp', [
    'ajoslin.promise-tracker',
    'restangular',
    'angulartics',
    'angulartics.google.analytics',
    'ui.utils',
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

    //Turn off virtual page tracking
    $analyticsProvider.virtualPageviews(false);

}).config(function(RestangularProvider) {

    //Set's the base path for all API calls to '/api/v1'
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRestangularFields({
      selfLink: 'link_href' // the attribute in our documents to link to themselves
    });

}).config(function($logProvider){

    //Enable debug messages
    $logProvider.debugEnabled(true);

});

angular.module('myApp.services', [ 'ajoslin.promise-tracker', 'restangular' ]);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', [ 'angulartics.google.analytics' ]);
angular.module('myApp.filters', []);
