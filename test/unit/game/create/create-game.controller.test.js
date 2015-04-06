describe('Controller: CreateGameController', function () {
    var $scope, $controller, dependencies, Game, GameType, expectedGameType;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;

        Game = MockResource.$new();
        GameType = MockResource.$new();
        $scope = $rootScope.$new();
        $scope.go = function () {};

        expectedGameType = {name: "ASSASSIN"};

        dependencies = {$scope: $scope, Game: Game, GameType: GameType};
        $controller('CreateGameController', dependencies);
    }));

    it('sets a new Game object on the $scope', function () {
        expect($scope.game).toBeDefined();
    });

    // TODO: enable me once API is available
    xit('sets the game types on the $scope', function () {
        var expectedGameTypes = [1];
        spyOn(GameType, 'query').andReturn(expectedGameTypes);

        $controller('CreateGameController', dependencies);

        expect(GameType.query).toHaveBeenCalled();
        expect($scope.gameTypes).toBe(expectedGameTypes);
    });

    it('allows the setting of game type', function () {
        $scope.setGameType(expectedGameType);
        expect($scope.game.gameType).toBe(expectedGameType);
    });

    describe('can create a new Game', function () {
        beforeEach(function () {
            $scope.setGameType(expectedGameType);
        });

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
