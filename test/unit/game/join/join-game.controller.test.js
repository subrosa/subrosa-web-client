describe('Controller: JoinGameController', function () {
    'use strict';

    var $controller, dependencies, $scope, $state, Player, Address, Image;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $state = {
            go: function () {}
        };

        Player = MockResource.$new();
        Address = MockResource.$new();
        Image = MockResource.$new();

        $scope.$stateParams = {gameUrl: 'raleigh-wars'};

        dependencies = {
            $scope: $scope,
            $state: $state,
            Player: Player,
            Address: Address,
            Image: Image
        };
        $controller('JoinGameController', dependencies);
    }));

    it("initializes empty notification list", function () {
        expect($scope.joinGameNotifications).toEqual([]);
    });

    describe("populates required sub objects", function () {
        it("to empties if not authenticated. ", function () {
            $scope.currentUser = null;
            $scope.$digest();

            expect($scope.player).toEqual({});
            expect($scope.players).toEqual([]);
            expect($scope.addresses).toEqual([]);
            expect($scope.images).toEqual([]);
        });

        it("to the response of relevant services if authenticated.", function () {
            var expected = [1, 2, 3];
            spyOn(Player, 'query').and.callThrough();
            spyOn(Address, 'query').and.callThrough();
            spyOn(Image, 'query').and.callThrough();
            Player.setSuccessResponse({results: expected});
            Address.setSuccessResponse({results: expected});
            Image.setSuccessResponse({results: expected});

            $scope.currentUser = {id: 1, name: 'walden'};
            $scope.$digest();

            expect($scope.player).toEqual({});
            expect($scope.players).toEqual(expected);
            expect($scope.addresses).toEqual(expected);
            expect($scope.images).toEqual(expected);
        });
    });

    it("sets the default player to the user's default player if set and more than one player.", function () {
        var expected = {id: 1, name: 'redworm'};
        Player.setSuccessResponse({results: [1, 2, 3]});
        $scope.currentUser = {player: expected};

        $scope.$digest();

        expect($scope.player).toBe(expected);
    });

    describe("transitions state", function () {
        beforeEach(function () {
            spyOn($state, 'go');
        });

        it("to the register state if not logged in.", function () {
            $scope.currentUser = null;
            $scope.$digest();
            expect($state.go).toHaveBeenCalledWith('game.join.register');
        });

        it("to the select player state if more than one player.", function () {
            $scope.currentUser = {id: 1, name: 'walden'};
            Player.setSuccessResponse({results: [1, 2, 3]});
            $scope.$digest();
            expect($state.go).toHaveBeenCalledWith('game.join.select-player');
        });

        it("to the player info state if only one player", function () {
            var players = {results: [{id: 1}]};

            $scope.currentUser = {id: 1, name: 'walden'};
            Player.setSuccessResponse(players);

            $scope.$digest();
            $scope.$digest();

            expect($scope.player).toBe(players.results[0]);
            expect($state.go).toHaveBeenCalledWith('game.join.select-player');
        });
    });
});

