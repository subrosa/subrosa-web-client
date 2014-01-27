describe('Controller: SessionController', function () {
    var $scope, AuthService;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        AuthService = {
            errorStatus: null,
            currentUser: null,
            
            isAuthenticated: function () {},
            logout: function () {},
            login: function () {
                var errorStatus = this.errorStatus;
                return {
                    error: function (callback) {
                        callback({}, errorStatus);
                    }
                };
            },
            loginConfirmed: function () {}
        };
    });

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();

        $scope.user = {email: 'valid@valid.com', password: 'bitcheye'};

        $controller('SessionController', {
            $scope: $scope,
            AuthService: AuthService
        });
    }));

    describe("handles login functionality", function () {
        it("by logging in with the correct credentials", function () {
            spyOn(AuthService, 'login').andCallThrough();

            $scope.login();

            expect(AuthService.login).toHaveBeenCalledWith($scope.user);
        });

        describe("by dealing with login failures", function () {
            it("by setting $scope.authError on 401", function () {
                AuthService.errorStatus = 401;
                spyOn(AuthService, 'login').andCallThrough();

                $scope.login();

                expect(AuthService.login).toHaveBeenCalled();
                expect($scope.errors.authError).toBe(true);
                expect($scope.errors.unknownError).toBe(false);
            });

            it("by setting $scope.unknownError on other errors", function () {
                AuthService.errorStatus = 500;
                spyOn(AuthService, 'login').andCallThrough();

                $scope.login();

                expect(AuthService.login).toHaveBeenCalled();
                expect($scope.errors.authError).toBe(false);
                expect($scope.errors.unknownError).toBe(true);
            });
        });
    });

    it("can call the logout API", function () {
        spyOn(AuthService, 'logout');

        $scope.logout();

        expect(AuthService.logout).toHaveBeenCalled();
    });
});
