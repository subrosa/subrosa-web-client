describe('Controller: Navigation', function () {
    var $scope;

    beforeEach(module('subrosa'));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('MainMenuController', {$scope: $scope});
    }));


});
