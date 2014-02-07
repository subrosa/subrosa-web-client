describe('Controller: EditGame', function () {
    var $controller, $scope, Game, game;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.gameForm = {
            $valid: true
        };
        Game = MockResource.$new();
        game = Game.get({id: 1});
    }));

    describe("sets the game on the $scope", function () {
        it("to the existing game if present", function () {
            $scope.game = game;
            $controller('EditGameController', {$scope: $scope, Game: Game});
            expect($scope.game).toBe(game);
        });

        it("to a new game object if not present", function () {
            $scope.game = undefined;
            $controller('EditGameController', {$scope: $scope, Game: Game});
            expect($scope.game).toBeDefined();
        });
    });

    it("sets the date format", function () {
        $controller('EditGameController', {$scope: $scope, Game: Game});
        expect($scope.dateFormat).toBe('MMMM dd yyyy');
    });

    describe("performs a save of the game", function () {
        beforeEach(function () {
            $controller('EditGameController', {$scope: $scope, Game: Game});
        });

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