describe('Controller: EditGameOptions', function () {
    var $scope;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($controller, $rootScope, MockResource) {
        $scope = $rootScope.$new();
        $scope.game = MockResource.$new().get({id: 1});
        $controller('EditGameOptionsController', {$scope: $scope});
    }));

    describe("performs a save of the game", function () {
        it("and can be successful", function () {
            spyOn($scope.game, '$save').andCallThrough();
            $scope.saveGame();
            expect($scope.game.$save).toHaveBeenCalled();
        });

        it("and can error", function () {
            spyOn($scope.game, '$save').andCallThrough();
            $scope.game.failed = true;
            $scope.saveGame();
            expect($scope.game.$save).toHaveBeenCalled();
            expect($scope.notifications.code).toBe(1000);
        });
    });
});