describe('Authentication Service', function () {
    var $rootScope, $http, $httpBackend, status, userData;

    beforeEach(module('security.auth', 'security.queue', 'views/security/sign-in-form.html'));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$http_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        userData = { email: 'jo@bloggs.com', images: {AVATAR: {uri:"/photos/blah.jpg"}}};
        $httpBackend.when('GET', '/subrosa-api/v1/user').respond(userData);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    var service, queue;
    beforeEach(inject(function ($injector) {
        service = $injector.get('AuthenticationService');
        queue = $injector.get('SecurityRetryQueue');
    }));

    describe('showLogin', function () {
        it("should open the dialog", function () {
            service.showLogin();
            expect(service.isDialogOpen()).toBe(true);
        });
    });

    describe('login', function () {
        it('sends a http request to login the specified user', function () {
            $httpBackend.expectPOST('/subrosa-api/v1/authenticate').respond(200);
            service.login('email', 'password');
            $httpBackend.flush();
            expect(service.currentUser).toBe(userData);
            expect(service.isDialogOpen()).toBe(false);
        });
        it('calls queue.retry on a successful login', function () {
            $httpBackend.expectPOST('/subrosa-api/v1/authenticate').respond(200);
            spyOn(queue, 'retryAll');
            service.showLogin();
            service.login('email', 'password');
            $httpBackend.flush();
            $rootScope.$digest();
            expect(queue.retryAll).toHaveBeenCalled();
            expect(service.currentUser).toBe(userData);
        });
        it('does not call queue.retryAll after a login failure', function () {
            $httpBackend.expectPOST('/subrosa-api/v1/authenticate').respond(200);
            spyOn(queue, 'retryAll');
            expect(queue.retryAll).not.toHaveBeenCalled();
            service.login('email', 'password');
            $httpBackend.flush();
            expect(queue.retryAll).not.toHaveBeenCalled();
        });
    });

    describe('logout', function () {
        beforeEach(function () {
            $httpBackend.when('POST', '/subrosa-api/v1/logout').respond(200, {});
        });

        it('sends a http post to clear the current logged in user', function () {
            $httpBackend.expect('POST', '/subrosa-api/v1/logout');
            service.logout();
            $httpBackend.flush();
        });

        it('redirects to / by default', function () {
            inject(function ($location) {
                spyOn($location, 'path');
                service.logout();
                $httpBackend.flush();
                expect($location.path).toHaveBeenCalledWith('/');
            });
        });

        it('redirects to the path specified in the first parameter', function () {
            inject(function ($location) {
                spyOn($location, 'path');
                service.logout('/other/path');
                $httpBackend.flush();
                expect($location.path).toHaveBeenCalledWith('/other/path');
            });
        });
    });

    describe("currentUser", function () {

        it("should be unauthenticated to begin with", function () {
            expect(service.isAuthenticated()).toBe(false);
            expect(service.currentUser).toBe(null);
        });
        it("should be authenticated if we update with user info", function () {
            var userInfo = {};
            service.currentUser = userInfo;
            expect(service.isAuthenticated()).toBe(true);
            expect(service.currentUser).toBe(userInfo);
        });
        it("should be admin if we update with admin user info", function () {
            var userInfo = { admin: true };
            service.currentUser = userInfo;
            expect(service.isAuthenticated()).toBe(true);
            expect(service.currentUser).toBe(userInfo);
        });

        it("should not be authenticated or admin if we clear the user", function () {
            var userInfo = { admin: true };
            service.currentUser = userInfo;
            expect(service.isAuthenticated()).toBe(true);
            expect(service.currentUser).toBe(userInfo);

            service.currentUser = null;
            expect(service.isAuthenticated()).toBe(false);
            expect(service.currentUser).toBe(null);
        });
    });

    describe('getCurrentUser', function () {
        it('makes a GET request to current-user url', function () {
            expect(service.isAuthenticated()).toBe(false);
            service.getCurrentUser().then(function (data) {
                resolved = true;
                expect(service.isAuthenticated()).toBe(true);
                expect(service.currentUser).toBe(userData);
            });
            $httpBackend.flush();
            expect(resolved).toBe(true);
        });
        it('returns the current user immediately if they are already authenticated', function () {
            userData = {};
            service.currentUser = userData;
            expect(service.isAuthenticated()).toBe(true);
            service.getCurrentUser().then(function (data) {
                resolved = true;
                expect(service.currentUser).toBe(userData);
            });
            expect(resolved).toBe(true);
        });
    });

});