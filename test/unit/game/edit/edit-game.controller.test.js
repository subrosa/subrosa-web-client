describe('Controller: EditGame', function () {
    var $controller, $scope, $state, $location, $anchorScroll;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.gameForm = {
            $valid: true
        };
        $state = {
            go: function () {
                return {
                    then: function (callback) {
                        callback();
                    }
                };
            }
        };
        $location = {hash: function () {}};
        $scope.game = MockResource.$new().get({id: 1});
        $anchorScroll = jasmine.createSpy('$anchorScroll');
    }));

    describe("performs a save of the game", function () {
        beforeEach(function () {
            $controller('EditGameController', {$scope: $scope, $state: $state,
                $location: $location, $anchorScroll: $anchorScroll});
        });

        it("and can be successful", function () {
            spyOn($scope.game, '$update').andCallThrough();
            $scope.saveGame();
            expect($scope.game.$update).toHaveBeenCalled();

            // TODO remove this once the game is not limited to free assassins
            expect($scope.game.price).toBe(0);
            expect($scope.game.gameType).toBe('ASSASSIN');
        });

        it("and can error", function () {
            spyOn($scope.game, '$update').andCallThrough();
            $scope.game.failed = true;
            $scope.saveGame();
            expect($scope.game.$update).toHaveBeenCalled();
            expect($scope.notifications.code).toBe(1000);
        });

        it("can ", function () {
            spyOn($state, 'go').andCallThrough();
            spyOn($location, 'hash');

            $scope.goToGameEvents();

            expect($state.go).toHaveBeenCalledWith('game.edit.events');
            expect($location.hash).toHaveBeenCalledWith('editGameEvents');
            expect($anchorScroll).toHaveBeenCalled();
        });
    });
});