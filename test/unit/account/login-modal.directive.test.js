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

    describe("sets the login modal options", function () {
        var user = {name: 'walden'}, options = {};

        it("of when the user has an account, attempted to register, and failed", function () {
            var expectedUser = user;
            spyOn(elementScope, 'openModal');
            options.loginViaRegisterFailed = true;

            $scope.$broadcast('auth-loginRequired', user, options);

            expectedUser.loginViaRegisterFailed = true;
            expect(elementScope.openModal).toHaveBeenCalledWith(expectedUser);
        });
    });
});
