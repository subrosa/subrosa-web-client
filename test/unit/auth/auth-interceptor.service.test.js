describe('Service: authInterceptor', function () {
    var $q, $rootScope, $window, API_CONFIG, authRetryQueue, authInterceptor;

    beforeEach(module('subrosa.auth'));

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

        authRetryQueue = {
            queue: [],
            append: function () {}
        };

        $provide.value('$rootScope', $rootScope);
        $provide.value('$q', $q);
        $provide.value('$window', $window);
        $provide.value('authRetryQueue', authRetryQueue);
    }));

    beforeEach(inject(function (_authInterceptor_, _API_CONFIG_) {
        authInterceptor = _authInterceptor_;
        API_CONFIG = _API_CONFIG_;
    }));

    describe('modifies request headers', function () {
        it('by adding the auth token if it exists.', function () {
            var request;
            $window.sessionStorage.token = 'abcde';
            request = authInterceptor.request({});
            expect(request.headers['X-SUBROSA-AUTH']).toBe($window.sessionStorage.token);
        });

        it('by doing nothing if auth token does not exist', function () {
            var request = authInterceptor.request({});
            expect(request.headers['X-SUBROSA-AUTH']).toBe(undefined);
        });
    });

    describe('intercepts unsuccessful responses', function () {
        var unauthorized;

        beforeEach(function () {
            unauthorized = {
                status: 401,
                config: {
                    url: API_CONFIG.URL + '/targets'
                }
            };
        });

        describe('and alters 401 responses', function () {
            it('by deleting the $window.sessionStorage token', function () {
                authInterceptor.responseError(unauthorized);
                expect($window.sessionStorage.token).not.toBeDefined();
            });

            it('by adding the response to the retry queue.', function () {
                spyOn(authRetryQueue, 'append');
                authInterceptor.responseError(unauthorized);
                expect(authRetryQueue.append).toHaveBeenCalledWith(unauthorized.config, jasmine.any(Object));
            });

            it('by broadcasting an event on the $rootScope', function () {
                spyOn($rootScope, '$broadcast');
                authInterceptor.responseError(unauthorized);
                expect($rootScope.$broadcast).toHaveBeenCalledWith('auth-loginRequired', unauthorized);
            });

            it('if the url is not the authenticate url', function () {
                unauthorized.config.url = API_CONFIG.URL + '/session';
                spyOn($rootScope, '$broadcast');
                spyOn(authRetryQueue, 'append');
                spyOn($q, 'reject');

                authInterceptor.responseError(unauthorized);

                expect($rootScope.$broadcast).not.toHaveBeenCalled();
                expect(authRetryQueue.append).not.toHaveBeenCalled();
                expect($q.reject).toHaveBeenCalledWith(unauthorized);
            });
        });
    });

    it('does not alter normal non-401 error response behavior', function () {
        var badRequest = {
            status: 400,
            config: {
                url: API_CONFIG.URL + '/targets'
            }
        };
        spyOn($q, 'reject');
        authInterceptor.responseError(badRequest);
        expect($q.reject).toHaveBeenCalledWith(badRequest);
    });
});
