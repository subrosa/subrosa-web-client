describe('Controller: EditGame', function () {
    var $controller, $scope;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.gameForm = {
            $valid: true
        };
        $scope.game = MockResource.$new().get({id: 1});
    }));

    it("sets today on the $scope", function () {
        var today = new Date();

        $controller('EditGameController', {$scope: $scope});

        expect($scope.today.getYear()).toBe(today.getYear());
        expect($scope.today.getMonth()).toBe(today.getMonth());
        expect($scope.today.getDay()).toBe(today.getDay());
        expect($scope.today.getHours()).toBe(today.getHours());
        expect($scope.today.getMinutes()).toBe(today.getMinutes());
    });

    it("sets the date format", function () {
        $controller('EditGameController', {$scope: $scope});
        expect($scope.dateFormat).toBe('MMMM dd yyyy');
    });

    describe("performs a save of the game", function () {
        beforeEach(function () {
            $controller('EditGameController', {$scope: $scope});
        });

        it("and can be successful", function () {
            spyOn($scope.game, '$update').andCallThrough();
            $scope.saveGame();
            expect($scope.game.$update).toHaveBeenCalled();
        });

        it("and can error", function () {
            spyOn($scope.game, '$update').andCallThrough();
            $scope.game.failed = true;
            $scope.saveGame();
            expect($scope.game.$update).toHaveBeenCalled();
            expect($scope.notifications.code).toBe(1000);
        });
    });
});