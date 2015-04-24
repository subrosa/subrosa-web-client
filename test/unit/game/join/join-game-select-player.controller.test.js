describe('Controller: JoinGameSelectPlayerController', function () {
    var $controller, dependencies, $scope, $state, Player;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();

        $state = {go: function () {}};

        Player = MockResource.$new();

        dependencies = {
            $scope: $scope,
            $state: $state,
            Player: Player
        };

        $controller('JoinGameSelectPlayerController', dependencies);
    }));

    it("initializes empty notification list", function () {
        expect($scope.selectPlayerNotifications).toEqual([]);
    });

    describe("allows the creation of a player", function () {
        beforeEach(function () {
            spyOn(Player, 'save').and.callThrough();
        });

        afterEach(function () {
            expect(Player.save).toHaveBeenCalledWith($scope.player,
                jasmine.any(Function), jasmine.any(Function));
        });

        it("and succeed", function () {
            spyOn($scope, "selectPlayer");
            $scope.createPlayer();
            expect($scope.selectPlayer).toHaveBeenCalledWith($scope.player);

        });

        it("and fail", function () {
            Player.failed = true;
            $scope.createPlayer();
            expect($scope.selectPlayerNotifications.length).toBe(1);
        });
    });

    it("allows the setting of the player image", function () {
        $scope.setPlayerImage({id: 2});
        expect($scope.player.imageId).toBe(2);
    });

    it("allows the selection of a player", function () {
        var expectedPlayer = {name: 'walden'};
        spyOn($state, 'go');

        $scope.selectPlayer(expectedPlayer);

        expect($scope.$parent.player).toBe(expectedPlayer);
        expect($state.go).toHaveBeenCalledWith('game.join.player-info');
    });
});

