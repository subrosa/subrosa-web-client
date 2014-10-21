describe('Controller: GameEnrollmentController', function () {
    var $controller, dependencies, $scope, $state, authService, Account,
        GamePlayer, player, account;

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


        authService = {
            getCurrentUser: function () {
                return {then: function (callback) {
                    callback(account);
                }};
            }
        };

        dependencies = {$scope: $scope, $state: $state, authService: authService,
            Account: Account, GamePlayer: GamePlayer};
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

    it("gets the current user and sets the account on the $scope", function () {
        spyOn(authService, 'getCurrentUser').andCallThrough();
        spyOn(Account, 'get').andCallThrough();

        $controller('GameEnrollmentController', dependencies);

        expect(Account.get).toHaveBeenCalledWith({id: 1, expansion: 'player'});
        expect(authService.getCurrentUser).toHaveBeenCalled();
        expect($scope.account).toBe(account);
    });
});

