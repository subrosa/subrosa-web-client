describe('Controller: SessionController', function () {
    var $scope, $httpBackend, AuthService;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        AuthService = {
            currentUser: null,
            isAuthenticated: function () {},
            destroySession: function () {},
            loginConfirmed: function () {}
        };
    });

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        $controller('SessionController', {
            $scope: $scope,
            AuthService: AuthService
        });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("handles login functionality", function () {
        it("by logging in with the correct credentials", function () {
            var response = {token: 'lalalala'};
            $httpBackend.expectPOST('/subrosa/v1/session').respond(200, response);
            spyOn(AuthService, 'loginConfirmed');

            $scope.user = {email: 'valid@valid.com', password: 'bitcheye'};
            $scope.login();
            $httpBackend.flush();

            expect(AuthService.loginConfirmed).toHaveBeenCalledWith(response);
        });

        it("by rejecting logins without the correct credentials", function () {
            $httpBackend.expectPOST('/subrosa/v1/session').respond(401, '');
            spyOn(AuthService, 'destroySession');

            $scope.login();
            $httpBackend.flush();

            expect(AuthService.destroySession).toHaveBeenCalled();
        });
    });

    it("can call the logout API", function () {
        $httpBackend.expectPOST('/subrosa/v1/logout').respond(200, '');
        spyOn(AuthService, 'destroySession');

        $scope.logout();
        $httpBackend.flush();

        expect(AuthService.destroySession).toHaveBeenCalled();
    });
});
