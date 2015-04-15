describe('Controller: JoinGamePlayerInfoController', function () {
    var $controller, dependencies, $scope, $state, flash, Address, GamePlayer;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.game = {url: 'lalala'};
        $scope.player = {id: 1};

        $state = {
            go: function () {}
        };

        flash = {
            add: function () {}
        };

        Address = MockResource.$new();
        GamePlayer = MockResource.$new();

        dependencies = {
            $scope: $scope,
            $state: $state,
            flash: flash,
            Address: Address,
            GamePlayer: GamePlayer
        };

        $scope.createPlayer = function () {};

        $controller('JoinGamePlayerInfoController', dependencies);
    }));

    it("initializes empty notification list", function () {
        expect($scope.joinGameNotifications).toEqual([]);
    });

    it("allows the selection of an object from multiple values", function () {
        var expected = {id: 123};
        $scope.joinGameForm = {abc: {$setViewValue: function () {}}};
        spyOn($scope.joinGameForm.abc, '$setViewValue');
        $scope.selectValue({fieldId: 'abc'}, expected);
        expect($scope.joinGameForm.abc.$setViewValue).toHaveBeenCalledWith(expected);
    });

    describe("allows a user to join a game", function () {
        var expectedPostData = {
            attributes: {},
            playerId: 1
        };

        beforeEach(function () {
            $scope.players = [{id: 1}, {id: 2}];
            $scope.player = $scope.players[0];
            spyOn(GamePlayer, 'save').andCallThrough();
        });

        describe("by ensuring attributes are object IDs", function () {
            beforeEach(function () {
                spyOn(Address, 'save').andCallThrough();
                $scope.game.playerInfo = [{type: 'address', fieldId: 'abc'}];
            });

            describe("by not creating an address", function () {
                afterEach(function () {
                    expect(Address.save).not.toHaveBeenCalled();
                    expect(GamePlayer.save).toHaveBeenCalledWith({url: $scope.game.url}, expectedPostData,
                        jasmine.any(Function), jasmine.any(Function));
                });

                it("if the view value is null", function () {
                    expectedPostData.attributes.abc = null;
                    $scope.attributes.abc = null;

                    $scope.joinGame();
                    $scope.$digest();
                });

                it("if the view value is null is not a string", function () {
                    expectedPostData.attributes.abc = 123;
                    $scope.attributes.abc = 123;

                    $scope.joinGame();
                    $scope.$digest();
                });
            });

            describe("by creating an address", function () {
                beforeEach(function () {
                    $scope.attributes.abc = 'lala';
                });

                afterEach(function () {
                    expect(Address.save).toHaveBeenCalledWith({fullAddress: 'lala'},
                        jasmine.any(Function), jasmine.any(Function));
                });

                it("and succeeding", function () {
                    expectedPostData.attributes.abc = {id: 123};
                    Address.setSuccessResponse({id: 123});

                    $scope.joinGame();
                    $scope.$digest();

                    expect($scope.attributes.abc).toEqual(expectedPostData.attributes.abc);
                    expect(GamePlayer.save).toHaveBeenCalledWith({url: $scope.game.url}, expectedPostData,
                        jasmine.any(Function), jasmine.any(Function));
                });

                it("and failing", function () {
                    Address.setFailed();

                    $scope.joinGame();
                    $scope.$digest();

                    expect(GamePlayer.save).not.toHaveBeenCalled();
                    expect($scope.joinGameNotifications.length).toBe(1);
                    expect($scope.joining).toBe(false);
                });
            });
        });

        describe("by creating a game player", function () {
            beforeEach(function () {
                spyOn(flash, 'add');
                spyOn($state, 'go');
                expectedPostData.attributes.abc = {id: 123};
                $scope.attributes.abc = {id: 123};
            });

            afterEach(function () {
                expect(GamePlayer.save).toHaveBeenCalledWith({url: $scope.game.url}, expectedPostData,
                    jasmine.any(Function), jasmine.any(Function));
            });

            it("and succeeding", function () {
                $scope.joinGame();
                $scope.$digest();

                expect(flash.add).toHaveBeenCalled();
                expect($state.go).toHaveBeenCalledWith('game');
            });

            it("and failing", function () {
                GamePlayer.setFailed();

                $scope.joinGame();
                $scope.$digest();

                expect($scope.joinGameNotifications.length).toBe(1);
                expect($scope.joining).toBe(false);
            });
        });
    });
});

