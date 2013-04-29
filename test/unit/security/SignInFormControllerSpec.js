'use strict'

describe('SignInFormController', function() {
    var scope, MockAuthenticationService, MockAccount, mockAccount, q, deferred;

    beforeEach(module('security.form'));

    beforeEach(module(function($provide) {
        MockAccount = function () {
            this.$save = function () {};
            return mockAccount;
        };
        mockAccount = new MockAccount();

        MockAuthenticationService = {
            login: function () {
                deferred = q.defer();
                return deferred.promise;
            },
            cancelLogin: function () {}
        };
        $provide.value('Account', MockAccount);
        $provide.value('AuthenticationService', MockAuthenticationService);
    }));

    beforeEach(inject(function($controller, $rootScope, $q) {
        q = $q;
        scope = $rootScope.$new();
        $controller('SignInFormController', {$scope: scope});
    }));

    it("provides a method for users to login via the AuthenticationService", function () {
        spyOn(MockAuthenticationService, "login").andCallThrough();
        scope.login();
        expect(MockAuthenticationService.login).toHaveBeenCalled();
    });

    it("provides a method for users to register", function () {
        scope.user = {email: 'yo@yo.com', password: 'bitcheye'};
        spyOn(mockAccount, "$save");
        scope.register();
        expect(mockAccount.$save).toHaveBeenCalled();

    });

    // @TODO: the controller should probably do this instead of the AuthenticationService
    it("provides a way to cancel login via the AuthenticationService", function () {
        spyOn(MockAuthenticationService, "cancelLogin").andCallThrough();
        scope.cancelSignIn();
        expect(MockAuthenticationService.cancelLogin).toHaveBeenCalled();
    });
});

