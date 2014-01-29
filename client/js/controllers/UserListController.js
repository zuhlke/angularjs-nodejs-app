'use strict';

angular.module('myApp.controllers').controller('UserListController', function($scope, $location, userSearchService) {

  $scope.setPage = function (pageNo) {
    var query = $location.search();
    query.start = parseInt(pageNo) - 1;
    $location.search(query);
  };

  userSearchService.getUsers().then(function(results) {
    $scope.users = results;
  }).then(function() {
    $scope.paginator = userSearchService.getPaginatorSettings();
  });

});
