describe('Unit test: AppVersion directive', function() {

  describe('#compile()', function() {

    var element = null;
    var $scope = null;

    beforeEach(module('templates'));
    beforeEach(module('myApp.services'));
    beforeEach(module('myApp.directives'));
    beforeEach(module(function($provide) {
      $provide.value('version', "1.0.0-SNAPSHOT");
    }));

    beforeEach(inject(function($rootScope) {
      element = angular.element('<span app-version></span>');
      $scope = $rootScope;
    }));

    it('should return the current version of the application', inject(function($compile) {

      $compile(element)($scope);
      $scope.$digest();

      element.html().should.equal('1.0.0-SNAPSHOT');

    }));
  });
});
