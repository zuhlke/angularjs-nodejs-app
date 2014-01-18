'use strict';

angular.module('myApp.services').factory('userService', function($timeout, Restangular) {

  var baseUsers = Restangular.all('users');

  return {

    getUser: function(trackerId) {
      return baseUsers.withHttpConfig({
        tracker: trackerId
      }).getList();
    }

  }

});
