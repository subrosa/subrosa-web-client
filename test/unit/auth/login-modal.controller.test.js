describe("Controller: LoginModalController", function () {
    'use strict';

    var $q, $controller, $rootScope, $scope, $state, $modalInstance, authService, user;

    beforeEach(module('subrosa.auth'));

    beforeEach(function () {
        $state = {
            transitionTo: function () {
                return {then: function (callback) {
                    callback();
                }};
            }
        };

        $modalInstance = {
            $get: function () {
                return this;
            },
            close: function () {},
            dismiss: function () {}
        };

        authService = {
            status: null,
            login: function () {
                var deferred = $q.defer();
                if (this.status === 200) {
                    deferred.resolve({});
                } else {
                    deferred.reject({status: this.status});
                }
                return deferred.promise;
            }
        };

        user = undefined;
    });

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_) {
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        $controller('LoginModalController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state,
            $modalInstance: $modalInstance,
            authService: authService,
            user: user
        });
    }));

    describe("handles login functionality", function () {
        it("by logging in with the correct credentials", function () {
            spyOn(authService, 'login').and.callThrough();
            $scope.login();
            expect(authService.login).toHaveBeenCalledWith($scope.user);
        });

        it("by closing the modal on success", function () {
            authService.status = 200;
            spyOn($modalInstance, 'close');

            $scope.login();
            $scope.$digest();

            expect($modalInstance.close).toHaveBeenCalled();
        });

        describe("by dealing with login failures", function () {
            it("by setting $scope.authError on 401", function () {
                authService.status = 401;
                spyOn(authService, 'login').and.callThrough();

                $scope.login();
                $scope.$digest();

                expect(authService.login).toHaveBeenCalled();
                expect($scope.errors.authError).toBe(true);
                expect($scope.errors.unknownError).toBe(false);
            });

            it("by setting $scope.unknownError on other errors", function () {
                authService.status = 500;
                spyOn(authService, 'login').and.callThrough();

                $scope.login();
                $scope.$digest();

                expect(authService.login).toHaveBeenCalled();
                expect($scope.errors.authError).toBe(false);
                expect($scope.errors.unknownError).toBe(true);
            });
        });
    });

    it("can close the modal dialog by clicking cancel", function () {
        spyOn($modalInstance, 'dismiss').and.callThrough();
        $scope.cancel();
        expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it("can show or hide the forgot password page", function () {
        expect($scope.forgotPassword).not.toBeDefined();
        $scope.showForgotPassword(true);
        expect($scope.forgotPassword).toBe(true);
        $scope.showForgotPassword(false);
        expect($scope.forgotPassword).toBe(false);
    });

    xdescribe("can call the API to request a password reset link", function () {
        // TODO add test once API is defined and this is implemented
    });

    it("can transition to the register page", function () {
        spyOn($modalInstance, 'dismiss');
        spyOn($state, 'transitionTo').and.callThrough();
        spyOn($rootScope, '$broadcast');

        $scope.user = {email: 'why@hello.com'};
        $scope.goToRegister();

        expect($rootScope.$broadcast).toHaveBeenCalledWith('toRegisterFromLogin', $scope.user);
        expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        expect($state.transitionTo).toHaveBeenCalledWith('register');
    });

    it("can pre-populate the current user if it was provided", function () {
        user = {email: 'yes@sir.com', password: 'lalala'};

        $controller('LoginModalController', {
            $scope: $scope,
            $state: $state,
            $modalInstance: $modalInstance,
            authService: authService,
            user: user
        });

        expect($scope.user).toBe(user);
    });
});
