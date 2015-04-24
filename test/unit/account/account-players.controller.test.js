describe('Controller: AccountGamesController', function () {
    var $controller, dependencies, $scope, User;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var $resource = MockResource.$new();

        $scope = $rootScope.$new();

        User = $resource;
        User.games = User.query;

        $controller = _$controller_;
        dependencies = {$scope: $scope, User: User};
    }));

    it("sets the current user's games on the $scope", function () {
        var games = [1, 2, 3];
        User.setSuccessResponse(games);
        spyOn(User, 'games').and.callThrough();

        $controller('AccountGamesController', dependencies);

        expect(User.games).toHaveBeenCalled();
        expect($scope.games).toBe(games);
    });
});
