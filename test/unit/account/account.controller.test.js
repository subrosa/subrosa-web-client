describe('Controller: AccountController', function () {
    var $controller, $scope, authService, accountFactory, account;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        accountFactory = MockResource.$new();
        account = accountFactory.get({id: 1});

        authService = {
            getCurrentUser: function () {
                return account;
            }
        };
    }));

    describe("performs a save of the account", function () {
        beforeEach(function () {
            $controller('AccountController', {$scope: $scope, authService: authService, Account: accountFactory});
        });

        it("and can be successful", function () {
            spyOn($scope.account, '$update').andCallThrough();
            $scope.saveAccount();
            expect($scope.account.$update).toHaveBeenCalled();
        });

        it("and can error", function () {
            spyOn($scope.account, '$update').andCallThrough();
            $scope.account.failed = true;
            $scope.saveAccount();
            expect($scope.account.$update).toHaveBeenCalled();
            expect($scope.notifications.code).toBe(1000);
        });
    });

    it("allows setting the current player", function () {
        var player = {id: 1, name: 'walden'};
        $controller('AccountController', {$scope: $scope, authService: authService, Account: accountFactory});
        spyOn($scope, 'saveAccount');

        $scope.setPlayer(player);

        expect($scope.saveAccount).toHaveBeenCalled();
    });

    it("gets the current user from the auth service and puts it on the scope", function () {
        spyOn(authService, 'getCurrentUser').andCallThrough();

        $controller('AccountController', {$scope: $scope, authService: authService, Account: accountFactory});

        expect(authService.getCurrentUser).toHaveBeenCalled();
        expect($scope.account).toBe(account);
    });
});
