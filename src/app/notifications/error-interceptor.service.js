/**
 * @ngdoc service
 * @name subrosa.notifications.errorInterceptor
 *
 * @requires $q
 * @requires errorDictionary
 *
 * @description
 *  An $httpProvider interceptor that looks up error codes and add the translated display message
 *  to the notification object.
 */
angular.module('subrosa.notifications').service('errorInterceptor', function ($q, errorDictionary) {
    this.responseError = function (rejection) {
        var notifications = [];

        if (rejection.status !== 401) {
            if (rejection.hasOwnProperty('data') && rejection.data.hasOwnProperty('notifications')) {
                angular.forEach(rejection.data.notifications, function (notification) {
                    notifications.push(errorDictionary.translate(notification));
                });
                rejection.data.notifications = notifications;
            } else {
                // Mask tomcat 500 errors
                rejection.data = {
                    notifications: [
                        {
                            message: errorDictionary.unknownError,
                            severity: 'ERROR'
                        }
                    ]
                };
            }
        }
        return $q.reject(rejection);
    };
});
