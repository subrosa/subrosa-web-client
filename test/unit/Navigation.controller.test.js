describe('Controller: Navigation', function () {
    var $scope;

    beforeEach(module('subrosa'));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('NavigationController', {$scope: $scope});
    }));

    it("defaults collapsed to true for the mobile menu button", function () {
        expect($scope.collapsed).toBe(true);
    });

    it("provides a function to toggle the state of $scope.collapsed", function () {
        $scope.toggleCollapse();
        expect($scope.collapsed).toBe(false);
        $scope.toggleCollapse();
        expect($scope.collapsed).toBe(true);
    });
});