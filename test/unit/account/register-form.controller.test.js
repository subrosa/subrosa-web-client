describe('Controller: RegisterFormController', function () {
    var $rootScope, $scope, $state, Account, authService, postData;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(function () {
        $state = {
            transitionTo: function () {}
        };

        authService = {
            login: function () {}
        };
    });

    beforeEach(inject(function ($controller, _$rootScope_, MockResource) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $scope.transitionTo = function () {};

        Account = MockResource.$new();

        $controller('RegisterFormController', {
            $scope: $scope,
            $state: $state,
            Account: Account,
            authService: authService
        });

        $scope.user = {email: 'valid@valid.com', password: 'bitcheye'};
        postData = {account: {email: $scope.user.email}, password: $scope.user.password};
    }));

    describe("handles registrations", function () {
        describe("by calling the API and successfully creating an account", function () {
            it("and logs the user in", function () {
                spyOn(authService, 'login');

                $scope.register();

                expect(authService.login).toHaveBeenCalledWith($scope.user);
            });

            describe("and handles state transitions", function () {
                beforeEach(function () {
                    spyOn($state, 'transitionTo');
                });

                it("by transitioning to fromState if it exists", function () {
                    $scope.fromState = 'account';
                    $scope.fromParams = {};

                    $scope.register();

                    expect($state.transitionTo).toHaveBeenCalledWith($scope.fromState,
                        $scope.fromParams);
                });

                it("by transitioning home otherwise", function () {
                    $scope.register();

                    expect($state.transitionTo).toHaveBeenCalledWith('home');
                });

            });
        });

        it("by calling the API and encountering an error", function () {
            var error = {data: {notifications: [{severity: "ERROR", "code": 10000010008}]}};
            Account.setErrorResponse(error);

            Account.failed = true;
            $scope.register();

            expect($scope.notifications.length).toBe(1);
            expect($scope.notifications).toBe(error.data.notifications);
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

        it("can set the user via an event", function () {
            var user = {email: 'why@yes.com', password: 'lalala'};
            $rootScope.$broadcast('toRegisterFromLogin', user);
            expect($scope.user).toBe(user);
        });
    });
});
