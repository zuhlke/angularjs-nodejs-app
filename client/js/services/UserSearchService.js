'use strict';

angular.module('myApp.services').factory('userSearchService', function($location, Restangular) {

  var totalItems = 0;

  var start = 0;

  var items = 0;

  var queryParameters;

  return {

    getUsers: function() {
      queryParameters = $location.search();

      Restangular.setFullResponse(true);
      Restangular.setResponseInterceptor(function (data, operation, what, url, response, deferred) {
        if (url === '/api/v1/users') {
          totalItems = response.headers()['total-items'];
          start = response.headers()['start'];
          items = response.headers()['items'];
          return response.data;
        }
      });
      return Restangular.all('users').getList($location.search());
    },

    getTotalItems: function() {
      return totalItems;
    },

    getPaginatorSettings: function() {
      return {
        totalItems: totalItems,
        currentPage:  parseInt(start) + 1,
        itemsPerPage:  items
      }
    }
  }

});
