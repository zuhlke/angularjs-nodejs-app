'use strict';

angular.module('myApp.services').factory('userService', function(loadingService, Restangular) {

  var baseUsers = Restangular.all('users');

  return {

    getUser: function() {
      return baseUsers.withHttpConfig({
        tracker: loadingService.getTrackerId()
      }).getList();
    },

    uniqueUsername: function(username) {
      return baseUsers.one(username).head();
    },

    uniqueEmail: function(email) {
      return baseUsers.head({email: email});
    }

  }

});
