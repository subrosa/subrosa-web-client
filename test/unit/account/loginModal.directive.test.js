describe('Directive: loginModal', function () {
    var $q, $scope, $compile, $modal, element, elementScope;

    beforeEach(module('subrosa.account'));

    beforeEach(module(function ($provide) {
        $modal = {
            $get: function () {
                return this;
            },
            open: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return {
                    result: deferred.promise
                };
            }
        };

        $provide.provider('$modal', $modal);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$q_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $q = _$q_;
    }));

    beforeEach(function () {
        element = angular.element(
            '<span login-modal>' +
                '<p>Hello!</p>' +
            '</span>');

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
    });

    it("can open a modal dialog", function () {
        spyOn($modal, 'open').andCallThrough();
        elementScope.openModal();
        expect($modal.open).toHaveBeenCalled();
    });

    it("opens the model on auth-loginRequired", function () {
        spyOn(elementScope, 'openModal');
        $scope.$broadcast('auth-loginRequired');
        expect(elementScope.openModal).toHaveBeenCalled();
    });

    describe("Controller: LoginModalController", function () {
        var $state, $modalInstance, AuthService;

        beforeEach(function () {
            $state = {
                transitionTo: function () {}
            };

            $modalInstance = {
                $get: function () {
                    return this;
                },
                close: function () {},
                dismiss: function () {}
            };

            AuthService = {
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
        });

        beforeEach(inject(function ($controller) {
            $controller('LoginModalController', {
                $scope: $scope,
                $state: $state,
                $modalInstance: $modalInstance,
                AuthService: AuthService
            });
        }));

        describe("handles login functionality", function () {
            it("by logging in with the correct credentials", function () {
                spyOn(AuthService, 'login').andCallThrough();
                $scope.login();
                expect(AuthService.login).toHaveBeenCalledWith($scope.user);
            });

            it("by closing the modal on success", function () {
                AuthService.status = 200;
                spyOn($modalInstance, 'close');

                $scope.login();
                $scope.$digest();

                expect($modalInstance.close).toHaveBeenCalled();
            });

            describe("by dealing with login failures", function () {
                it("by setting $scope.authError on 401", function () {
                    AuthService.status = 401;
                    spyOn(AuthService, 'login').andCallThrough();

                    $scope.login();
                    $scope.$digest();

                    expect(AuthService.login).toHaveBeenCalled();
                    expect($scope.errors.authError).toBe(true);
                    expect($scope.errors.unknownError).toBe(false);
                });

                it("by setting $scope.unknownError on other errors", function () {
                    AuthService.status = 500;
                    spyOn(AuthService, 'login').andCallThrough();

                    $scope.login();
                    $scope.$digest();

                    expect(AuthService.login).toHaveBeenCalled();
                    expect($scope.errors.authError).toBe(false);
                    expect($scope.errors.unknownError).toBe(true);
                });
            });
        });

        it("can close the modal dialog by clicking cancel", function () {
            elementScope.openModal();
            spyOn($modalInstance, 'dismiss').andCallThrough();
            $scope.cancel();
            expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });

        it("can transition to the register page", function () {
            spyOn($modalInstance, 'dismiss');
            spyOn($state, 'transitionTo');

            $scope.goToRegister();

            expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
            expect($state.transitionTo).toHaveBeenCalledWith('register');
        });
    });
});