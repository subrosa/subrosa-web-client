describe('Factory: AuthService', function () {
    var $rootScope, $httpBackend, AuthService, session, authRetryQueue;

    beforeEach(module('subrosa.security'));

    beforeEach(module(function ($provide) {
        session = {
            getToken: function () {},
            removeToken: function () {},
            setToken: function () {}
        };

        authRetryQueue = {
            rejectAll: function () {},
            retryAll: function () {},
            transform: function () {}
        };

        $provide.value('session', session);
        $provide.value('authRetryQueue', authRetryQueue);
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

    it('can check for authentication via session', function () {
        expect(AuthService.isAuthenticated()).toBe(false);
        spyOn(session, 'getToken').andReturn("lalala");
        expect(AuthService.isAuthenticated()).toBe(true);
        expect(session.getToken).toHaveBeenCalled();
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

        it('and call session.removeToken on failure', function () {
            $httpBackend.expectGET('/subrosa/v1/user').respond(400, '');
            spyOn(session, 'removeToken');

            AuthService.getCurrentUser();
            $httpBackend.flush();

            expect(session.removeToken).toHaveBeenCalled();

        });
    });

    describe('can login via the Subrosa API', function () {
        it("and calls loginConfirmed on success", function () {
            $httpBackend.expectPOST('/subrosa/v1/session').respond(200, {token: 'lalala'});
            spyOn(AuthService, 'loginConfirmed');

            AuthService.login({email: 'blah@blah.com', password: 'walden'});
            $httpBackend.flush();

            expect(AuthService.loginConfirmed).toHaveBeenCalledWith({token: 'lalala'});
        });

        it("and calls session.removeToken on error", function () {
            $httpBackend.expectPOST('/subrosa/v1/session').respond(401, {token: 'lalala'});
            spyOn(session, 'removeToken');

            AuthService.login();
            $httpBackend.flush();

            expect(session.removeToken).toHaveBeenCalled();
        });
    });

    it('can confirm the login and retry all requests in the authRetryQueue', function () {
        var data = {token: 'lalala'}, updater = function () {};
        $httpBackend.expectGET('/subrosa/v1/user').respond(200, '');
        spyOn(session, 'setToken');
        spyOn(authRetryQueue, 'retryAll');
        spyOn($rootScope, '$broadcast');

        AuthService.loginConfirmed(data, updater);
        $httpBackend.flush();

        expect(session.setToken).toHaveBeenCalledWith(data.token);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginConfirmed', data);
        expect(authRetryQueue.retryAll).toHaveBeenCalledWith(updater);
    });

    it('can cancel the login', function () {
        spyOn($rootScope, '$broadcast');
        spyOn(authRetryQueue, 'rejectAll');

        AuthService.loginCancelled({}, 'rejected');

        expect(authRetryQueue.rejectAll).toHaveBeenCalledWith('rejected');
        expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginCancelled', {});
    });

    it('can logout', function () {
        $httpBackend.expectPOST('/subrosa/v1/logout').respond(200, '');
        spyOn(session, 'removeToken');

        AuthService.logout();
        $httpBackend.flush();

        expect(session.removeToken).toHaveBeenCalled();
        expect(AuthService.currentUser).toBe(null);
    });

    it('can transform the requests via the authRetryQueue', function () {
        var func = function () {};
        spyOn(authRetryQueue, 'transform');

        AuthService.transformRequests(func);

        expect(authRetryQueue.transform).toHaveBeenCalledWith(func);
    });
});
