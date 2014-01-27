describe('Factory: AuthService', function () {
    var $rootScope, $httpBackend, AuthService, Session, AuthRetryQueue;

    beforeEach(module('subrosa.security'));

    beforeEach(module(function ($provide) {
        Session = {
            getToken: function () {},
            removeToken: function () {},
            setToken: function () {}
        };

        AuthRetryQueue = {
            rejectAll: function () {},
            retryAll: function () {},
            transform: function () {}
        };

        $provide.value('Session', Session);
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

    it('can check for authentication via Session', function () {
        expect(AuthService.isAuthenticated()).toBe(false);
        spyOn(Session, 'getToken').andReturn("lalala");
        expect(AuthService.isAuthenticated()).toBe(true);
        expect(Session.getToken).toHaveBeenCalled();
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

        it('and call Session.removeToken on failure', function () {
            $httpBackend.expectGET('/subrosa/v1/user').respond(400, '');
            spyOn(Session, 'removeToken');

            AuthService.getCurrentUser();
            $httpBackend.flush();

            expect(Session.removeToken).toHaveBeenCalled();

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

        it("and calls Session.removeToken on error", function () {
            $httpBackend.expectPOST('/subrosa/v1/session').respond(401, {token: 'lalala'});
            spyOn(Session, 'removeToken');

            AuthService.login();
            $httpBackend.flush();

            expect(Session.removeToken).toHaveBeenCalled();
        });
    });

    it('can confirm the login and retry all requests in the AuthRetryQueue', function () {
        var data = {token: 'lalala'}, updater = function () {};
        $httpBackend.expectGET('/subrosa/v1/user').respond(200, '');
        spyOn(Session, 'setToken');
        spyOn(AuthRetryQueue, 'retryAll');
        spyOn($rootScope, '$broadcast');

        AuthService.loginConfirmed(data, updater);
        $httpBackend.flush();

        expect(Session.setToken).toHaveBeenCalledWith(data.token);
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
        $httpBackend.expectPOST('/subrosa/v1/logout').respond(200, '');
        spyOn(Session, 'removeToken');

        AuthService.logout();
        $httpBackend.flush();

        expect(Session.removeToken).toHaveBeenCalled();
        expect(AuthService.currentUser).toBe(null);
    });

    it('can transform the requests via the AuthRetryQueue', function () {
        var func = function () {};
        spyOn(AuthRetryQueue, 'transform');

        AuthService.transformRequests(func);

        expect(AuthRetryQueue.transform).toHaveBeenCalledWith(func);
    });
});