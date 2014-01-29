'use strict';

angular.module('myApp.users').factory('userSearchService', function($q, $location, Restangular) {

  var totalItems = 0;

  var start = 0;

  var items = 0;

  var queryParameters;

  return {

    getUsers: function() {
      var deferred = $q.defer();

      queryParameters = $location.search();

      Restangular.all('users').getList($location.search()).then(function(results) {
        totalItems = results.metadata.total_items;
        start = results.metadata.start;
        items = results.metadata.items;
        deferred.resolve(results);
      });

      return deferred.promise;
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
