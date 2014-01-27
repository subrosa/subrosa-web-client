describe('Controller: RegisterFormController', function () {
    var $scope, Account, AuthService;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        Account = function () {
            return {
                $save: function (callback) {
                    callback();
                }
            };
        };

        AuthService = {
            login: function () {}
        };
    });

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();

        $scope.user = {email: 'valid@valid.com', password: 'bitcheye'};

        $controller('RegisterFormController', {
            $scope: $scope,
            Account: Account,
            AuthService: AuthService
        });
    }));

    describe("handles register functionality", function () {
        it("by successfully registering and logging in afterward", function () {
            spyOn(AuthService, 'login');

            $scope.register();

            expect(AuthService.login).toHaveBeenCalledWith($scope.user);
        });
    });
});
