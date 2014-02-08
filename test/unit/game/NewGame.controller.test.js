describe('Controller: NewGame', function () {
    var $scope, Game;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($controller, $rootScope, MockResource) {
        Game = MockResource.$new();
        $scope = $rootScope.$new();
        $scope.transitionTo = function () {
            return {then: function (callback) {
                callback();
            }};
        };
        $controller('NewGameController', {$scope: $scope, Game: Game});
    }));

    it('sets a new Game object on the scope', function () {
        expect($scope.game).toBeDefined();
    });

    describe('can create a new Game', function () {
        it('and can be successful', function () {
            spyOn($scope.game, '$save').andCallFake(function (success) {
                success({data: {url: 'abcd'}});
            });
            spyOn($scope, 'transitionTo');
            $scope.createGame();
            expect($scope.game.$save).toHaveBeenCalled();
            expect($scope.transitionTo).toHaveBeenCalledWith('game.edit', {gameUrl: 'abcd'});
        });

        it("and can error", function () {
            spyOn($scope.game, '$save').andCallThrough();
            $scope.game.failed = true;
            $scope.createGame();
            expect($scope.game.$save).toHaveBeenCalled();
            expect($scope.notifications.code).toBe(1000);
        });
    });
});