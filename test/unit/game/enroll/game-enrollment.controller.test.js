describe('Controller: GameEnrollmentController', function () {
    var $controller, dependencies, $scope, $state, authService, Account,
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

        Player = MockResource.$new();

        authService = {
            getCurrentUser: function (callback) {
                callback();
                return account;
            }
        };

        dependencies = {$scope: $scope, $state: $state, authService: authService,
            Account: Account, Player: Player, GamePlayer: GamePlayer};
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
            expect($scope.joinGameNotifications.length).toBe(1);
        });
    });

    it("gets the current user and sets the account on the $scope", function () {
        spyOn(authService, 'getCurrentUser').andCallThrough();

        $controller('GameEnrollmentController', dependencies);

        expect(authService.getCurrentUser).toHaveBeenCalledWith(jasmine.any(Function));
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

