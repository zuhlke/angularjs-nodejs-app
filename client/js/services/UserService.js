'use strict';

angular.module('myApp.services').factory('userService', function(loadingService, Auth, Restangular) {

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
    },

    login: function(user) {
      return Restangular.all('login').withHttpConfig({
        tracker: loadingService.getTrackerId()
      }).post(user);
    },

    register: function(user) {
      return Restangular.all('register').post(user);
    }

  }

});
