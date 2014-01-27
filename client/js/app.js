'use strict';

angular.module('myApp', [
    'ajoslin.promise-tracker',
    'restangular',
    'angulartics',
    'angulartics.google.analytics',
    'ui.utils',
    'ui.bootstrap',
    'ngRoute',
    'ngCookies',
    'myApp.services',
    'myApp.filters',
    'myApp.directives',
    'myApp.controllers'
]).constant('ACCESS_LEVELS', {
  pub: 1,
  user: 2,
  admin: 3
})
.config(function($routeProvider, ACCESS_LEVELS) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        accessLevel: ACCESS_LEVELS.pub
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController',
        accessLevel: ACCESS_LEVELS.pub
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        accessLevel: ACCESS_LEVELS.user
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController',
        accessLevel: ACCESS_LEVELS.admin
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

}).config(function($httpProvider) {

  var interceptor = function($q, $rootScope, Auth) {
    return {
      response: function(resp) {
        if (resp.config.url == '/api/v1/register' || resp.config.url == '/api/v1/login') {
          Auth.setUser(resp.data);
        }
        return resp || $q.when(resp);
      },

      responseError: function(rejection) {
        switch(rejection.status) {
          case 401:
            if (rejection.config.url !== 'api/v1/login') {
              $rootScope.$broadcast('auth:loginRequired');
            }
            break;

          case 403:
            $rootScope.$broadcast('auth:forbidden');
            break;

          case 404:
            $rootScope.$broadcast('page:notFound');
            break;

          case 500:
            $rootScope.$broadcast('server:error');
            break;
        }
        return $q.reject(rejection);
      }
    }
  }
  $httpProvider.interceptors.push(interceptor);

}).run(function($rootScope, $location, ACCESS_LEVELS, Auth) {

  $rootScope.$on('$routeChangeStart', function(evt, next, curr) {

    if (next.accessLevel === ACCESS_LEVELS.pub) {
      return;
    }

    if (!Auth.isAuthorized(next.accessLevel)) {
      if (Auth.isLoggedIn()) {
        //The user is logged in, but does not have permissions to view the view
        $location.path('/');
      } else {
        $location.path('/');
      }
    }
  });

});

angular.module('myApp.services', [ 'ajoslin.promise-tracker', 'restangular' ]);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', [ 'angulartics.google.analytics', 'ui.bootstrap' ]);
angular.module('myApp.filters', []);
