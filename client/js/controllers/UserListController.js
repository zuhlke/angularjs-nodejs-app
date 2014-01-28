'use strict';

angular.module('myApp.controllers').controller('UserListController', function($scope, $location, userSearchService) {

  userSearchService.getUsers().then(function(results) {
    $scope.users = results.users;
    $scope.totalItems = results.totalItems;
    $scope.currentPage = parseInt(results.start) + 1;
    $scope.itemsPerPage = results.items;
  });

  $scope.setPage = function (pageNo) {
    var query = $location.search();
    query.start = parseInt(pageNo) - 1;
    $location.search(query);
  };


});
