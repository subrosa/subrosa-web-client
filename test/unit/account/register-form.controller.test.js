describe('Controller: RegisterFormController', function () {
    var $rootScope, $scope, $state, Account, authService, postData, flash;

    beforeEach(module('subrosa.account', 'mocks'));

    beforeEach(function () {
        $state = {
            transitionTo: function () {}
        };

        authService = {
            failed: false,
            login: function () {
                var self = this;
                return {
                    then: function (success, error) {
                        if (self.failed) {
                            error();
                        } else {
                            success();
                        }

                    }
                };
            }
        };
    });

    beforeEach(inject(function ($controller, _$rootScope_, MockResource) {
        var i18n = jasmine.createSpy('i18n').and.returnValue('translated');

        flash = {add: function () {}};

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $scope.transitionTo = function () {};

        Account = MockResource.$new();

        $controller('RegisterFormController', {
            $scope: $scope,
            $state: $state,
            Account: Account,
            authService: authService,
            i18n: i18n,
            flash: flash
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

        describe("by handling the case when an account already exists", function () {
            beforeEach(function () {
                spyOn(authService, 'login').and.callThrough();
                Account.setErrorResponse({status: 409});
                Account.failed = true;

            });

            it("by logging in and displaying a message if provided with correct credentials.", function () {
                spyOn(flash, 'add');

                $scope.register();

                expect(authService.login).toHaveBeenCalledWith($scope.user);
                expect(flash.add).toHaveBeenCalledWith('success', jasmine.any(String));
            });

            it("by logging in and displaying a message if provided with incorrect credentials.", function () {
                spyOn($scope, 'goToLogin');

                authService.failed = true;
                $scope.register();

                expect(authService.login).toHaveBeenCalledWith($scope.user);
                expect($scope.goToLogin).toHaveBeenCalledWith({loginViaRegisterFailed: true});
            });
        });

        describe("can transition to the login dialog", function () {
            beforeEach(function () {
                spyOn($state, 'transitionTo');
                spyOn($scope, 'openLoginModal');
            });

            afterEach(function () {
                expect($scope.openLoginModal).toHaveBeenCalled();
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
