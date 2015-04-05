describe('Controller: AccountPlayersController', function () {
    var $controller, dependencies, $scope, Player;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var $resource = MockResource.$new();

        $scope = $rootScope.$new();

        Player = $resource;
        $scope.account = $resource.get({id: 1});

        $controller = _$controller_;
        dependencies = {$scope: $scope, Player: Player};
    }));

    describe("allows setting the current player", function () {
        var player = {id: 1, name: 'walden'};

        beforeEach(function () {
            $controller('AccountPlayersController', dependencies);
            spyOn($scope.account, '$update').andCallThrough();
        });

        afterEach(function () {
            expect($scope.account.$update).toHaveBeenCalled();
        });

        it("and succeed", function () {
            $scope.setPlayer(player);
            expect($scope.accountPlayerNotifications.length).toBe(0);
        });

        it("and fail", function () {
            $scope.account.failed = true;
            $scope.setPlayer(player);
            expect($scope.accountPlayerNotifications.length).toBe(1);
        });
    });

    it("sets the current user's players on the $scope", function () {
        var players = [1, 2, 3];
        Player.setSuccessResponse({results: players});
        spyOn(Player, 'query').andCallThrough();

        $controller('AccountPlayersController', dependencies);

        expect(Player.query).toHaveBeenCalled();
        expect($scope.players).toBe(players);
    });
});
