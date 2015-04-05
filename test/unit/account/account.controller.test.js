describe('Controller: AccountController', function () {
    var $controller, dependencies, $scope, account;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var $resource = MockResource.$new();

        $scope = $rootScope.$new();

        account = $resource.get({id: 1});
        $scope.currentUser = account;

        $controller = _$controller_;
        dependencies = {$scope: $scope};
    }));

    it("sets the account as the current user on the $scope", function () {
        $controller('AccountController', dependencies);
        expect($scope.account).toBe(account);
    });

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
});
