describe('Security Interceptor', function() {
    var queue, interceptor, promise, wrappedPromise;

    beforeEach(module('security.interceptor', 'security.queue'));

    beforeEach(inject(function($injector) {
        queue = $injector.get('SecurityRetryQueue');
        interceptor = $injector.get('SecurityInterceptor');
        wrappedPromise = {};
        promise = {
            then: jasmine.createSpy('then').andReturn(wrappedPromise)
        };
    }));

    it('accepts and returns a promise.', function() {
        var newPromise = interceptor(promise);
        expect(promise.then).toHaveBeenCalled();
        expect(promise.then.mostRecentCall.args[0]).toBe(null);
        expect(newPromise).toBe(wrappedPromise);
    });

    it('does not intercept non-401 error responses.', function() {
        var httpResponse = {
            status: 400,
            config: {
                url: '/subrosa-api/v1/targets'
            }
        };
        interceptor(promise);
        var errorHandler = promise.then.mostRecentCall.args[1];
        expect(errorHandler(httpResponse)).toBe(promise);
    });

    it('does not intercept 401 responses from the authenticate call.', function() {
        var httpResponse = {
            status: 401,
            config: {
                url: '/subrosa-api/v1/authenticate'
            }
        };
        interceptor(promise);
        var errorHandler = promise.then.mostRecentCall.args[1];
        expect(errorHandler(httpResponse)).toBe(promise);
    });

    it('intercepts 401 error responses and adds it to the retry queue.', function() {
        var notAuthResponse = {
            status: 401,
            config: {
                url: '/subrosa-api/v1/targets'
            }
        };
        interceptor(promise);
        var errorHandler = promise.then.mostRecentCall.args[1];
        var newPromise = errorHandler(notAuthResponse);
        expect(queue.hasMore()).toBe(true);
        expect(queue.retryReason()).toBe('unauthorized-server');
    });
});
