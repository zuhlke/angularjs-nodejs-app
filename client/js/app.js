'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.filters',
  'myApp.directives',
  'myApp.controllers'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

var controllers = angular.module('myApp.controllers', []);
var services = angular.module('myApp.services', []);
var directives = angular.module('myApp.directives', []);
var filters = angular.module('myApp.filters', []);
