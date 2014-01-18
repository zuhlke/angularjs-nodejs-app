'use strict';

angular.module('myApp.services').factory('userService', function(loadingService, Restangular) {

  var baseUsers = Restangular.all('users');

  return {

    getUser: function() {
      return baseUsers.withHttpConfig({
        tracker: loadingService.getTrackerId()
      }).getList();
    }

  }

});
