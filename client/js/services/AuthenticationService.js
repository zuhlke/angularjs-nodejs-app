'use strict';

angular.module('myApp.services').factory('authenticationService', function(Restangular, loadingService) {

  var baseAuth = Restangular.all('authenticate');

  return {

    authenticate: function(user) {

      return baseAuth.withHttpConfig({
        tracker: loadingService.getTrackerId()
      }).post(user);

    }

  }

});
