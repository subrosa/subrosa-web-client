/**
 * @ngdoc factory
 * @name subrosa.notifications.ErrorInterceptor
 *
 * @requires $q
 * @requires ErrorDictionary
 *
 * @description
 *  An $httpProvider interceptor that looks up error codes and add the translated display message
 *  to the notification object.
 */
angular.module('subrosa.notifications').factory('ErrorInterceptor', function ($q, ErrorDictionary) {
    return {
        responseError: function (rejection) {
            var notifications = [];

            if (rejection.status !== 401) {
                if (rejection.hasOwnProperty('data') && rejection.data.hasOwnProperty('notifications')) {
                    angular.forEach(rejection.data.notifications, function (notification) {
                        notification = ErrorDictionary.transform(notification);
                        notifications.push(notification);
                    });
                    rejection.data.notifications = notifications;
                } else {
                    // Hide tomcat 500 errors
                    rejection.data = {notifications: [ErrorDictionary.unknownError]};
                }
            }
            return $q.reject(rejection);
        }
    };
});