describe('Factory: AuthInterceptor', function () {
    var $q, $rootScope, $window, AuthRetryQueue, AuthInterceptor;

    beforeEach(module('subrosa.security'));

    beforeEach(module(function ($provide) {
        $q = {
            then: function () {},
            when: function () {},
            reject: function () {},
            defer: function () {
                return {promise: {}};
            }
        };

        $rootScope = {$broadcast: function () {}};
        $window = {sessionStorage: {}};

        AuthRetryQueue = {
            queue: [],
            append: function () {}
        };

        $provide.value('$rootScope', $rootScope);
        $provide.value('$q', $q);
        $provide.value('$window', $window);
        $provide.value('AuthRetryQueue', AuthRetryQueue);
    }));

    beforeEach(inject(function (_AuthInterceptor_) {
        AuthInterceptor = _AuthInterceptor_;
    }));

    describe('modifies request headers', function () {
        it('by adding the auth token if it exists.', function () {
            var request;
            $window.sessionStorage.token = 'abcde';
            request = AuthInterceptor.request({});
            expect(request.headers['X-SUBROSA-AUTH']).toBe($window.sessionStorage.token);
        });

        it('by doing nothing if auth token does not exist', function () {
            var request = AuthInterceptor.request({});
            expect(request.headers['X-SUBROSA-AUTH']).toBe(undefined);
        });
    });

    it('allows successfull responses to pass through', function () {
        var response = { status: 200, config: { url: '/subrosa/v1/targets'}};
        spyOn(AuthRetryQueue, 'append');
        expect(AuthInterceptor.response(response)).toBe(response);
        expect(AuthRetryQueue.append).not.toHaveBeenCalled();
    });

    describe('intercepts unsuccessful responses', function () {
        var unauthorized;

        beforeEach(function () {
            unauthorized = {
                status: 401,
                config: {
                    url: '/subrosa/v1/targets'
                }
            };
        });

        describe('and alters 401 responses', function () {
            it('by deleting the $window.sessionStorage token', function () {
                AuthInterceptor.responseError(unauthorized);
                expect($window.sessionStorage.token).not.toBeDefined();
            });

            it('by adding the response to the retry queue.', function () {
                spyOn(AuthRetryQueue, 'append');
                AuthInterceptor.responseError(unauthorized);
                expect(AuthRetryQueue.append).toHaveBeenCalledWith(unauthorized.config, jasmine.any(Object));
            });

            it('by broadcasting an event on the $rootScope', function () {
                spyOn($rootScope, '$broadcast');
                AuthInterceptor.responseError(unauthorized);
                expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginRequired', unauthorized);
            });

            it('if the url is not the authenticate url', function () {
                unauthorized.config.url = '/subrosa/v1/session';
                spyOn($rootScope, '$broadcast');
                spyOn(AuthRetryQueue, 'append');
                spyOn($q, 'reject');

                AuthInterceptor.responseError(unauthorized);

                expect($rootScope.$broadcast).not.toHaveBeenCalled();
                expect(AuthRetryQueue.append).not.toHaveBeenCalled();
                expect($q.reject).toHaveBeenCalledWith(unauthorized);
            });
        });
    });

    it('does not alter normal non-401 error response behavior', function () {
        var badRequest = {
            status: 400,
            config: {
                url: '/subrosa/v1/targets'
            }
        };
        spyOn($q, 'reject');
        AuthInterceptor.responseError(badRequest);
        expect($q.reject).toHaveBeenCalledWith(badRequest);
    });
});