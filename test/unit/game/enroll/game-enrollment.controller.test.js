describe('Controller: GameEnrollmentController', function () {
    var $controller, dependencies, $scope, $state, authService, Account,
        Player, player, GamePlayer, account;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};
        $scope.game = {url: 'lalala'};

        $state = {go: function () {}};

        Player = MockResource.$new();
        player = Player.get({id: 1});

        GamePlayer = MockResource.$new();

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
            Account: Account, Player: Player, GamePlayer: GamePlayer};
        $controller('GameEnrollmentController', dependencies);

    }));

    describe("provides the ability to join a game", function () {
        beforeEach(function () {
            $controller('GameEnrollmentController', dependencies);
            spyOn($state, 'go');
        });

        it("by allowing the creation of a new player", function () {
            spyOn($scope, 'editPlayer');
            $scope.newPlayer();
            expect($scope.editPlayer).toHaveBeenCalledWith(new Player());
        });

        it("by allowing the editing of a player", function () {
            var player = {name: 'Juan'};
            $scope.editPlayer(player);
            expect($scope.player).toEqual(player);
            expect($state.go).toHaveBeenCalledWith('game.enroll.edit-player');
        });

        it("by allowing the cancellation of editing of a player", function () {
            $scope.cancelEditPlayer();
            expect($scope.player).toEqual(null);
            expect($state.go).toHaveBeenCalledWith('game.enroll.select-player');
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

                expect($scope.editPlayerNotifications.code).toBe(1000);
                expect($scope.setPlayer).not.toHaveBeenCalled();
            });
        });

        it("by selecting the player", function () {
            var player = {name: 'Juan'};
            $scope.setPlayer(player);
            expect($scope.player).toEqual(player);
            expect($state.go).toHaveBeenCalledWith('game.enroll.join-game');
        });

        describe("by joining the game", function () {
            beforeEach(function () {
                spyOn(GamePlayer, 'save').andCallThrough();
            });

            afterEach(function () {
                expect(GamePlayer.save).toHaveBeenCalledWith({url: $scope.game.url}, player,
                    jasmine.any(Function), jasmine.any(Function));
            });

            it("and succeeding", function () {
                $scope.player = player;
                $scope.joinGame();
                expect($state.go).toHaveBeenCalledWith('game');
            });

            it("and failing", function () {
                GamePlayer.failed = true;
                $scope.joinGame();
                expect($scope.joinGameNotifications.code).toBe(1000);
            });
        });
    });

    describe("gets the current user", function () {
        beforeEach(function () {
            spyOn(authService, 'getCurrentUser').andCallThrough();
            spyOn(Account, 'get').andCallThrough();
        });

        it("and sets the account on the $scope", function () {
            $controller('GameEnrollmentController', dependencies);

            expect(Account.get).toHaveBeenCalledWith({id: 1, expansion: 'player'}, jasmine.any(Function));
            expect(authService.getCurrentUser).toHaveBeenCalled();
            expect($scope.account).toBe(account);
        });
    });

    describe("transitions to the enrollment page", function () {
        beforeEach(function () {
            spyOn($state, 'go');
        });

        it("of the new player page if the account doesn't have players", function () {
            $controller('GameEnrollmentController', dependencies);

            expect($state.go).toHaveBeenCalledWith('game.enroll.edit-player');
        });

        it("of the select player page if the account has players", function () {
            account.players = ['player'];
            $controller('GameEnrollmentController', dependencies);

            expect($state.go).toHaveBeenCalledWith('game.enroll.select-player');
        });
    });
});

