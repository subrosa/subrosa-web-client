describe('Controller: GameController', function () {
    var $scope, MockGameFactory;

    beforeEach(module('subrosa.game'));

    beforeEach(module(function ($provide) {
        MockGameFactory = {
            get: function () {
                return {
                    name: "Raleigh Wars",
                    url: "raleigh-wars",
                    $publish: function (success, error) {
                        if (this.failed) {
                            error(this.errorResponse);
                        } else {
                            success(this.successResponse);
                        }
                    }
                };
            }
        };
        spyOn(MockGameFactory, "get").andCallThrough();
        $provide.value('Game', MockGameFactory);
    }));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};
        $controller('GameController', {$scope: $scope});
    }));

    it('sets the game on the $scope by calling the Game Service.', function () {
        expect(MockGameFactory.get).toHaveBeenCalledWith({url: 'raleigh-wars'});
        expect($scope.game.name).toBe(MockGameFactory.get().name);
        expect($scope.game.url).toBe(MockGameFactory.get().url);
    });

    describe('allows the publishing of a game.', function () {
        beforeEach(function () {
            spyOn($scope.game, '$publish').andCallThrough();
        });

        afterEach(function () {
            expect($scope.game.$publish).toHaveBeenCalled();
            expect($scope.saving).toBe(false);
        });

        it('and succeeds', function () {
            $scope.publishGame();
            expect($scope.notifications).not.toBeDefined();
        });

        it('and errors', function () {
            $scope.go = function () {};
            spyOn($scope, 'go');
            $scope.game.failed = true;
            $scope.game.errorResponse = {
                data: {
                    notifications: 'hi!'
                }
            };

            $scope.publishGame();

            expect($scope.go).toHaveBeenCalledWith('game.edit');
            expect($scope.notifications).toBe('hi!');
        });
    });
});
