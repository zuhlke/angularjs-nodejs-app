'use strict';

angular.module('myApp.services').factory('authenticationService', function($log, Restangular, loadingService) {

  return {

    authenticate: function(user) {
      return Restangular.all('authenticate').withHttpConfig({
        tracker: loadingService.getTrackerId()
      }).post(user);
    },

    createUser: function(user) {
      return Restangular.all('users').post(user);
    }

  }

});
