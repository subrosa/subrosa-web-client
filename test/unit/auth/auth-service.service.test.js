describe('Service: authService', function () {
    var $rootScope, $httpBackend, authService, User, user, session, authRetryQueue, $facebook, API_CONFIG;

    beforeEach(module('subrosa.auth'));

    beforeEach(module(function ($provide) {
        user = {email: 'blah@blah.com', name: 'walden'};

        User = {
            failed: false,
            get: function (success, error) {
                if (this.failed) {
                    error();
                } else {
                    success({data: user});
                }
            }
        };

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

        $facebook = {
            login: function () {}
        };

        $provide.value('User', User);
        $provide.value('session', session);
        $provide.value('authRetryQueue', authRetryQueue);
        $provide.value('$facebook', $facebook);
    }));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _authService_, _API_CONFIG_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        authService = _authService_;
        API_CONFIG = _API_CONFIG_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('can check for authentication via session', function () {
        expect(authService.isAuthenticated()).toBe(false);
        spyOn(session, 'getToken').andReturn("lalala");
        expect(authService.isAuthenticated()).toBe(true);
        expect(session.getToken).toHaveBeenCalled();
    });

    describe('can retrieve the current user', function () {
        it('and sets the current user on success', function () {
            spyOn(User, 'get').andCallThrough();

            authService.getCurrentUser();

            expect(authService.currentUser.email).toBe(user.email);
            expect(authService.currentUser.name).toBe(user.name);
        });

        it('and call session.removeToken on failure', function () {
            spyOn(User, 'get').andCallThrough();
            spyOn(session, 'removeToken');

            User.failed = true;
            authService.getCurrentUser();

            expect(session.removeToken).toHaveBeenCalled();

        });
    });

    describe('can login via the Subrosa API_CONFIG', function () {
        it("and calls loginConfirmed on success", function () {
            $httpBackend.expectPOST(API_CONFIG.URL + '/session').respond(200, {token: 'lalala'});
            spyOn(authService, 'loginConfirmed');

            authService.login({email: 'blah@blah.com', password: 'walden'});
            $httpBackend.flush();

            expect(authService.loginConfirmed).toHaveBeenCalledWith({token: 'lalala'});
        });

        it("and calls session.removeToken on error", function () {
            $httpBackend.expectPOST(API_CONFIG.URL + '/session').respond(401, {token: 'lalala'});
            spyOn(session, 'removeToken');

            authService.login();
            $httpBackend.flush();

            expect(session.removeToken).toHaveBeenCalled();
        });
    });

    it('can confirm the login and retry all requests in the authRetryQueue', function () {
        var data = {token: 'lalala'}, updater = function () {};

        spyOn(session, 'setToken');
        spyOn(authRetryQueue, 'retryAll');
        spyOn($rootScope, '$broadcast');

        authService.loginConfirmed(data, updater);

        expect(session.setToken).toHaveBeenCalledWith(data.token);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginConfirmed', data);
        expect(authRetryQueue.retryAll).toHaveBeenCalledWith(updater);
    });

    it('can cancel the login', function () {
        spyOn($rootScope, '$broadcast');
        spyOn(authRetryQueue, 'rejectAll');

        authService.loginCancelled({}, 'rejected');

        expect(authRetryQueue.rejectAll).toHaveBeenCalledWith('rejected');
        expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginCancelled', {});
    });

    it('can logout', function () {
        $httpBackend.expectDELETE(API_CONFIG.URL + '/session').respond(200, '');
        spyOn(session, 'removeToken');

        authService.logout();
        $httpBackend.flush();

        expect(session.removeToken).toHaveBeenCalled();
        expect(authService.currentUser).toBe(null);
    });

    it('can transform the requests via the authRetryQueue', function () {
        var func = function () {};
        spyOn(authRetryQueue, 'transform');

        authService.transformRequests(func);

        expect(authRetryQueue.transform).toHaveBeenCalledWith(func);
    });
});
