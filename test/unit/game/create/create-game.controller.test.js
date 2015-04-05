describe('Controller: CreateGameController', function () {
    var $scope, Game;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($controller, $rootScope, MockResource) {
        Game = MockResource.$new();
        $scope = $rootScope.$new();
        $scope.go = function () {};
        $controller('CreateGameController', {$scope: $scope, Game: Game});
    }));

    it('sets a new Game object on the scope', function () {
        expect($scope.game).toBeDefined();
    });

    it('allows the setting of game type', function () {
        $scope.setGameType('ASSASSIN');
        expect($scope.game.gameType).toBe('ASSASSIN');
    });

    describe('can create a new Game', function () {
        it('and can be successful', function () {
            spyOn($scope.game, '$save').andCallFake(function (success) {
                success({url: 'abcd'});
            });
            spyOn($scope, 'go');
            $scope.createGame();
            expect($scope.game.$save).toHaveBeenCalled();
            expect($scope.go).toHaveBeenCalledWith('game.edit', {gameUrl: 'abcd'});
        });

        it("and can error", function () {
            spyOn($scope.game, '$save').andCallThrough();
            $scope.game.failed = true;
            $scope.createGame();
            expect($scope.game.$save).toHaveBeenCalled();
            expect($scope.createGameNotifications.length).toBe(1);
        });
    });
});
