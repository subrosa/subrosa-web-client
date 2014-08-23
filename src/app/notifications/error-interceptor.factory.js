/**
 * @ngdoc factory
 * @name subrosa.notifications.errorInterceptor
 *
 * @requires $q
 * @requires errorDictionary
 *
 * @description
 *  An $httpProvider interceptor that looks up error codes and add the translated display message
 *  to the notification object.
 */
angular.module('subrosa.notifications').factory('errorInterceptor', function ($q, errorDictionary) {
    return {
        responseError: function (rejection) {
            var notifications = [];

            if (rejection.status !== 401) {
                if (rejection.hasOwnProperty('data') && rejection.data.hasOwnProperty('notifications')) {
                    angular.forEach(rejection.data.notifications, function (notification) {
                        notification = errorDictionary.transform(notification);
                        notifications.push(notification);
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
        }
    };
});
