describe('Controller: RegisterFormController', function () {
    var $scope, $state, $httpBackend, Account, AuthService;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        $state = {
            transitionTo: function () {}
        };

        AuthService = {
            login: function () {}
        };
    });

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _Account_) {
        $scope = $rootScope.$new();
        $scope.user = {email: 'valid@valid.com', password: 'bitcheye'};
        $scope.transitionTo = function () {};

        $httpBackend = _$httpBackend_;
        Account = _Account_;

        $controller('RegisterFormController', {
            $scope: $scope,
            $state: $state,
            Account: Account,
            AuthService: AuthService
        });
    }));

    describe("handles registrations", function () {
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe("by calling the API and successfully creating an account", function () {
            beforeEach(function () {
                $httpBackend.expectPOST('/subrosa/v1/account', $scope.user).respond(200);
            });

            it("and logs the user in", function () {
                spyOn(AuthService, 'login');

                $scope.register();
                $httpBackend.flush();

                expect(AuthService.login).toHaveBeenCalledWith($scope.user);
            });

            describe("and handles state transitions", function () {
                beforeEach(function () {
                    spyOn($state, 'transitionTo');
                });

                it("by transitioning to fromState if it exists", function () {
                    $scope.fromState = 'account';
                    $scope.fromParams = {};

                    $scope.register();
                    $httpBackend.flush();

                    expect($state.transitionTo).toHaveBeenCalledWith($scope.fromState,
                        $scope.fromParams);
                });

                it("by transitioning home otherwise", function () {
                    $scope.register();
                    $httpBackend.flush();

                    expect($state.transitionTo).toHaveBeenCalledWith('home');
                });

            });
        });

        describe("by calling the API and encountering an error", function () {
            beforeEach(function () {
                $httpBackend.expectPOST('/subrosa/v1/account', $scope.user).respond(400, "someError");
            });

            it("sets the error on the $scope", function () {
                $scope.register();
                $httpBackend.flush();
                expect($scope.registerError).toBe("someError");
            });
        });

        describe("can transition to the login dialog", function () {
            beforeEach(function () {
                spyOn($state, 'transitionTo');
                spyOn($scope, 'openLogin');
            });

            afterEach(function () {
                expect($scope.openLogin).toHaveBeenCalled();
            });

            it("by transitioning to fromState if it exists", function () {
                $scope.fromState = 'account';
                $scope.fromParams = {};

                $scope.goToLogin();

                expect($state.transitionTo).toHaveBeenCalledWith($scope.fromState,
                    $scope.fromParams);
            });

            it("by transitioning home otherwise", function () {
                $scope.goToLogin();
                expect($state.transitionTo).toHaveBeenCalledWith('home');
            });
        });
    });
});
