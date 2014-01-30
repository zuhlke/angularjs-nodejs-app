'use strict';

angular.module('myApp.global', []);
angular.module('myApp.dashboard', ['google-maps']);
angular.module('myApp.login', []);
angular.module('myApp.register', []);
angular.module('myApp.userDetails', []);
angular.module('myApp.users', []);

angular.module('myApp', [
    'ui.bootstrap',
    'ui.utils',
    'angulartics',
    'angulartics.google.analytics',
    'ajoslin.promise-tracker',
    'restangular',
    'ngRoute',
    'ngCookies',
    'myApp.global',
    'myApp.dashboard',
    'myApp.login',
    'myApp.register',
    'myApp.userDetails',
    'myApp.users'
]).constant('ACCESS_LEVELS', {
  pub: 1,
  user: 2,
  admin: 3
})
.config(function($routeProvider, $locationProvider, ACCESS_LEVELS) {

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
        accessLevel: ACCESS_LEVELS.pub
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserListController',
        accessLevel: ACCESS_LEVELS.user
      })
      .when('/users/:username', {
        templateUrl: 'views/userDetails.html',
        controller: 'UserDetailController',
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

    //The attribute in our documents to link to themselves
    RestangularProvider.setRestangularFields({
      selfLink: 'link_href'
    });

    RestangularProvider.setResponseExtractor(function(response, operation) {
      var newResponse;
      if (operation === 'getList' && response.data && response.metadata) {
        // Here we're returning an Array which has one special property metadata with our extra information
        newResponse = response.data;
        newResponse.metadata = response.metadata;
      } else {
        // This is an element
        newResponse = response;
      }
      return newResponse;
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

    if (!(next.accessLevel === ACCESS_LEVELS.pub)) {
      if (!Auth.isAuthorized(next.accessLevel)) {
        $location.path('/');
      }
    }

  });

});
