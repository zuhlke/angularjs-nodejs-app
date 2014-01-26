'use strict';

angular.module('myApp.services').factory('authenticationService', function($log, $cookieStore, Restangular, loadingService) {

  var _user = $cookieStore.get('user');

  return {

    authenticate: function(user) {
      return Restangular.all('authenticate').withHttpConfig({
        tracker: loadingService.getTrackerId()
      }).post(user);
    },

    createUser: function(user) {
      return Restangular.all('register').post(user);
    }
  }

});
