'use strict';

angular.module('myApp.users').controller('UserListItemController', function($scope, $modal, $location, userService) {

  $scope.isCollapsed = false;

  $scope.open = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/removeUserModal.html',
      controller: 'RemoveUserModalInstanceController',
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function (user) {
      userService.remove(user);
    }, function () {
      //User cancelled the operation
    });
  };

  $scope.editUser = function() {
    $location.path('/users/' + $scope.user.username_orig);
  }

});

angular.module('myApp.users').controller('RemoveUserModalInstanceController', function($scope, $modalInstance, user, $log) {

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.ok = function () {
    $modalInstance.close(user);
  };

  $scope.user = user;

});

