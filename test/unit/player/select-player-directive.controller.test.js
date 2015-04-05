describe('Controller: SelectPlayerDirectiveController', function () {
    var $scope, Player, player;

    beforeEach(module('subrosa.player', 'mocks'));

    beforeEach(inject(function ($q, $controller, $rootScope, MockResource) {
        $scope = $rootScope.$new();

        Player = MockResource.$new();
        player = Player.get({id: 1});

        $controller('SelectPlayerDirectiveController', {$scope: $scope, Player: Player});
    }));

    it("by allowing the creation of a new player", function () {
        spyOn($scope, 'editPlayer');
        $scope.newPlayer();
        expect($scope.editPlayer).toHaveBeenCalledWith(new Player());
    });

    it("by allowing the editing of a player", function () {
        var player = {name: 'Juan'};
        $scope.editPlayer(player);
        expect($scope.player).toEqual(player);
    });

    it("by allowing the cancellation of editing of a player", function () {
        $scope.cancelEditPlayer();
        expect($scope.player).toEqual(null);
    });

    describe("by saving a player", function () {
        beforeEach(function () {
            spyOn(player, '$save').andCallThrough();
        });

        afterEach(function () {
            expect(player.$save).toHaveBeenCalledWith(jasmine.any(Function),
                jasmine.any(Function));
        });

        it("and succeeding", function () {
            spyOn($scope, 'setPlayer');
            $scope.savePlayer(player);
            expect($scope.setPlayer).toHaveBeenCalled();
        });

        it("and failing", function () {
            spyOn($scope, 'setPlayer');
            player.failed = true;

            $scope.savePlayer(player);

            expect($scope.editPlayerNotifications.length).toBe(1);
            expect($scope.setPlayer).not.toHaveBeenCalled();
        });
    });

    it("by selecting the player", function () {
        var player = {name: 'Juan'};
        $scope.setPlayerCallback = function () {};
        spyOn($scope, 'setPlayerCallback');

        $scope.setPlayer(player);

        expect($scope.player).toEqual(player);
        expect($scope.setPlayerCallback).toHaveBeenCalledWith({player: player});
    });
});
