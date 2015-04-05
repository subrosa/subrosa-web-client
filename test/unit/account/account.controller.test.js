describe('Controller: AccountController', function () {
    var $controller, dependencies, $scope, authService, Player, account;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var $resource = MockResource.$new();

        $scope = $rootScope.$new();

        Player = $resource;
        account = $resource.get({id: 1});

        authService = {
            getCurrentUser: function (callback) {
                callback();
                return account;
            }
        };

        $controller = _$controller_;
        dependencies = {$scope: $scope, authService: authService, Player: Player};
    }));

    describe("performs a save of the account", function () {
        beforeEach(function () {
            $controller('AccountController', dependencies);
        });

        it("and can be successful", function () {
            spyOn($scope.account, '$update').andCallThrough();
            $scope.updateAccount();
            expect($scope.account.$update).toHaveBeenCalled();
        });

        it("and can error", function () {
            spyOn($scope.account, '$update').andCallThrough();
            $scope.account.failed = true;
            $scope.updateAccount();
            expect($scope.account.$update).toHaveBeenCalled();
            expect($scope.notifications.length).toBe(1);
        });
    });

    it("allows setting the current player", function () {
        var player = {id: 1, name: 'walden'};
        $controller('AccountController', dependencies);
        spyOn($scope, 'updateAccount');

        $scope.setPlayer(player);

        expect($scope.updateAccount).toHaveBeenCalled();
    });

    it("gets the current user from the auth service and puts it on the scope", function () {
        spyOn(authService, 'getCurrentUser').andCallThrough();

        $controller('AccountController', dependencies);

        expect(authService.getCurrentUser).toHaveBeenCalled();
        expect($scope.account).toBe(account);
    });

    it("sets the current user's players on the $scope", function () {
        var players = [1, 2, 3];
        Player.setSuccessResponse({results: players});
        spyOn(Player, 'query').andCallThrough();

        $controller('AccountController', dependencies);

        expect(Player.query).toHaveBeenCalled();
        expect($scope.players).toBe(players);
    });
});
