describe('Controller: Account', function () {
    var $controller, $scope, AuthService, Account, account;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        Account = MockResource.$new();
        account = Account.get({id: 1});

        AuthService = {
            getCurrentUser: function () {
                return {then: function (callback) {
                    callback(account);
                }};
            }
        };
    }));

    it("gets the current user from the auth service and puts it on the scope", function () {
        spyOn(AuthService, 'getCurrentUser').andCallThrough();

        $controller('AccountController', {$scope: $scope, AuthService: AuthService, Account: Account});

        expect(AuthService.getCurrentUser).toHaveBeenCalled();
        expect($scope.account).toBe(account);
    });

    describe("performs a save of the account", function () {
        beforeEach(function () {
            $controller('AccountController', {$scope: $scope, AuthService: AuthService, Account: Account});
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
});