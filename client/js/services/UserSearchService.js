'use strict';

angular.module('myApp.services').factory('userSearchService', function($location, Restangular) {

  return {

    getUsers: function() {
      return Restangular.all('users').getList($location.search());
    }



  }

});
