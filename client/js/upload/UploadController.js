'use strict';

angular.module('myApp.upload').controller('UploadController', function($scope, $http, $filter, $window) {

  $scope.options = {
    url: '/api/v1/upload'
  };

  $scope.loadingFiles = true;
  $http.get($scope.options.url).then(function (response) {
      $scope.loadingFiles = false;
      $scope.queue = response.data.files || [];
    }, function () {
      $scope.loadingFiles = false;
    }
  );
});

angular.module('myApp.upload').controller('FileDestroyController', function($scope, $http) {
  var file = $scope.file, state;

  if (file.url) {
    file.$state = function () {
      return state;
    };

    file.$destroy = function () {
      state = 'pending';
      return $http({url: file.deleteUrl, method: file.deleteType}).then(
        function () {
          state = 'resolved';
          $scope.clear(file);
        }, function () {
          state = 'rejected';
        }
      );
    };

  } else if (!file.$cancel && !file._index) {
    file.$cancel = function () {
      $scope.clear(file);
    };
  }
});