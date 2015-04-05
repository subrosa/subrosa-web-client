describe('Controller: GameEnrollmentController', function () {
    var $controller, dependencies, $scope, $state, Account,
        GamePlayer, Player, player, account;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};
        $scope.game = {url: 'lalala'};

        $state = {go: function () {}};

        GamePlayer = MockResource.$new();
        player = GamePlayer.get({id: 1});

        Account = MockResource.$new();
        account = Account.get({id: 1});
        $scope.currentUser = account;

        Player = MockResource.$new();

        dependencies = {
            $scope: $scope,
            $state: $state,
            Account: Account,
            Player: Player,
            GamePlayer: GamePlayer
        };
        $controller('GameEnrollmentController', dependencies);

    }));

    describe("allows joining the game", function () {
        beforeEach(function () {
            spyOn(GamePlayer, 'save').andCallThrough();
            $scope.player = player;
        });

        afterEach(function () {
            expect(GamePlayer.save).toHaveBeenCalledWith({url: $scope.game.url}, player,
                jasmine.any(Function), jasmine.any(Function));
        });

        it("and succeeding", function () {
            spyOn($state, 'go');
            $scope.joinGame();
            expect($state.go).toHaveBeenCalledWith('game');
        });

        it("and failing", function () {
            GamePlayer.failed = true;
            $scope.joinGame();
            expect($scope.joinGameNotifications.code).toBe(1000);
        });
    });

    it("sets the account as the current user on the $scope", function () {
        $controller('AccountController', dependencies);
        expect($scope.account).toBe(account);
    });

    it("sets the current user's players on the $scope", function () {
        var players = [1, 2, 3];
        Player.setSuccessResponse({results: players});
        spyOn(Player, 'query').andCallThrough();

        $controller('GameEnrollmentController', dependencies);

        expect(Player.query).toHaveBeenCalled();
        expect($scope.players).toBe(players);
    });
});

