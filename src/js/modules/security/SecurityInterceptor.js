'use strict';

angular.module('security.interceptor', []);

// This http interceptor listens for authentication failures
angular.module('security.interceptor').factory('SecurityInterceptor', function ($injector, SecurityRetryQueue) {
    return function (promise) {
        // Intercept failed requests
        return promise.then(null, function (originalResponse) {
            if (originalResponse.status === 401 && originalResponse.config.url !== '/subrosa-api/v1/authenticate') {
                // The request bounced because it was not authorized - add a new request to the retry queue
                promise = SecurityRetryQueue.pushRetryFn('unauthorized-server', function retryRequest() {
                    // We must use $injector to get the $http service to prevent circular dependency
                    return $injector.get('$http')(originalResponse.config);
                });
            }
            return promise;
        });
    };
});

// We have to add the interceptor to the queue as a string because the interceptor depends
// upon service instances that are not available in the config block.
angular.module('security').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.responseInterceptors.push('SecurityInterceptor');
}]);