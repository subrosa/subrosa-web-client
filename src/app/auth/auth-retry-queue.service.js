/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  HTTP Auth Interceptor Module for AngularJS
 *  (c) 2012 Witold Szczerba
 *  License: MIT
 *
 *  https://github.com/witoldsz/angular-http-auth/
 */

/**
 * @ngdoc service
 * @name subrosa.auth.authRetryQueue
 *
 * @requires $injector
 *
 * @description
 *  A container to hold all unauthorized http requests so they can be
 *  retried in the future.
 */
angular.module('subrosa.auth').service('authRetryQueue', function ($injector) {
    // TODO $http service initialized later because of circular dependency problem.
    var $http, retryQueue = [];

    function retryHttpRequest(config, deferred) {
        function successCallback(response) {
            deferred.resolve(response);
        }
        function errorCallback(response) {
            deferred.reject(response);
        }
        $http = $http || $injector.get('$http');
        $http(config).then(successCallback, errorCallback);
    }

    return {

        /**
         * Get the current retry queue.
         *
         * @returns Array the current retry queue.
         */
        getQueue: function () {
            return retryQueue;
        },

        /**
         * Appends HTTP request configuration object with deferred response attached to retryQueue.
         *
         * @param config the HTTP config object.
         * @param deferred the deferred promise.
         */
        append: function (config, deferred) {
            retryQueue.push({
                config: config,
                deferred: deferred
            });
        },

        /**
         * Apply a function to every call in the retryQueue array.
         *
         * @param func the function to use for transformation.
         */
        transform: function (func) {
            retryQueue = retryQueue.map(func);
        },

        /**
         * Reject all requests in the queue.
         *
         * @param reason the reason why all requests were rejected.
         */
        rejectAll: function (reason) {
            if (reason) {
                for (var i = 0; i < retryQueue.length; i = i + 1) {
                    retryQueue[i].deferred.reject(reason);
                }
            }
            retryQueue = [];
        },

        /**
         * Retries all the buffered requests clears the retryQueue.
         *
         * TODO: are we sure we want to empty the queue on error?
         *
         * @param updater a function to update the request config.
         */
        retryAll: function (updater) {
            if (!updater) {
                updater = function (item) { return item; };
            }
            for (var i = 0; i < retryQueue.length; i = i + 1) {
                retryHttpRequest(updater(retryQueue[i].config), retryQueue[i].deferred);
            }
            retryQueue = [];
        }
    };
});
