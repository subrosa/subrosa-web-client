describe('Controller: EditGameRules', function () {
    var $controller, $scope;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.EditGameRules = {
            $valid: true
        };
        $scope.game = MockResource.$new().get({id: 1});
    }));

    describe("performs a save of the game", function () {
        beforeEach(function () {
            $controller('EditGameRulesController', {$scope: $scope});
        });

        it("and can be successful", function () {
            spyOn($scope.game, '$update').andCallThrough();
            $scope.saveGame();
            expect($scope.game.$update).toHaveBeenCalled();
        });

        it("and can error", function () {
            spyOn($scope.game, '$update').andCallThrough();
            $scope.game.failed = true;
            $scope.saveGame();
            expect($scope.game.$update).toHaveBeenCalled();
            expect($scope.gameOptionNotifications.length).toBe(1);
        });
    });
});
