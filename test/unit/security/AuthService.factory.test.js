describe('Factory: AuthService', function () {
    var $rootScope, $window, $httpBackend, AuthRetryQueue, AuthService;

    beforeEach(module('subrosa.security'));

    beforeEach(module(function ($provide) {
        $window = {sessionStorage: {}};

        AuthRetryQueue = {
            rejectAll: function () {},
            retryAll: function () {},
            transform: function () {}
        };

        $provide.value('$window', $window);
        $provide.value('AuthRetryQueue', AuthRetryQueue);
    }));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _AuthService_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('can check for authentication via sessionStorage', function () {
        $window.sessionStorage.token = 'lalala';
        expect(AuthService.isAuthenticated()).toBe($window.sessionStorage.token);
    });

    describe('can retrieve the current user', function () {
        it('and sets the current user on success', function () {
            var user = {email: 'blah@blah.com', name: 'walden'};
            $httpBackend.expectGET('/subrosa/v1/user').respond(200, user);

            AuthService.getCurrentUser();
            $httpBackend.flush();

            expect(AuthService.currentUser.email).toBe(user.email);
            expect(AuthService.currentUser.name).toBe(user.name);
        });

        it('and call logout on failure', function () {
            $httpBackend.expectGET('/subrosa/v1/user').respond(400, '');
            spyOn(AuthService, 'logout');

            AuthService.getCurrentUser();
            $httpBackend.flush();

            expect(AuthService.logout).toHaveBeenCalled();

        });
    });

    it('can confirm the login and retry all requests in the AuthRetryQueue', function () {
        var data = {token: 'lalala'}, updater = function () {};
        $httpBackend.expectGET('/subrosa/v1/user').respond(200, '');
        spyOn(AuthRetryQueue, 'retryAll');
        spyOn($rootScope, '$broadcast');

        AuthService.loginConfirmed(data, updater);
        $httpBackend.flush();

        expect($window.sessionStorage.token).toBe(data.token);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginConfirmed', data);
        expect(AuthRetryQueue.retryAll).toHaveBeenCalledWith(updater);
    });

    it('can cancel the login', function () {
        spyOn($rootScope, '$broadcast');
        spyOn(AuthRetryQueue, 'rejectAll');

        AuthService.loginCancelled({}, 'rejected');

        expect(AuthRetryQueue.rejectAll).toHaveBeenCalledWith('rejected');
        expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginCancelled', {});
    });

    it('can logout', function () {
        $window.sessionStorage.token = 'lalala';
        $httpBackend.expectPOST('/subrosa/v1/logout').respond(200);

        AuthService.logout();
        $httpBackend.flush();

        expect($window.sessionStorage.token).toBe(undefined);
    });

    it('can transform the requests via the AuthRetryQueue', function () {
        var func = function () {};
        spyOn(AuthRetryQueue, 'transform');

        AuthService.transformRequests(func);

        expect(AuthRetryQueue.transform).toHaveBeenCalledWith(func);
    });
});