/**
 * @ngdoc directive
 * @name subrosa.notifications:notificationDisplay
 *
 * @requires $timeout
 *
 * @description
 *   Provides a display for error and success notifications.
 */
angular.module('subrosa.notifications').directive('notificationDisplay', function ($timeout) {
    const SUCCESS_FADEOUT = 5000;

    return {
        restrict: 'AE',
        templateUrl: '/app/notifications/views/notification-display.html',
        scope: {
            notifications: '=notificationDisplay'
        },
        link: function (scope) {
            scope.closeNotification = function (index) {
                scope.notifications.splice(index, 1);
            };

            scope.$watch('notifications', function (notifications) {
                angular.forEach(notifications, function (notification, index) {
                    if (notification.hasOwnProperty('severity')) {
                        notification.type = notification.severity.toLowerCase();
                    }

                    // For automatic bootstrap 3 styling (they use danger instead of error)
                    if (notification.type === 'error') {
                        notification.type = 'danger';
                    }

                    if (notification.type === 'success') {
                        $timeout(function () {
                            scope.closeNotification(index);
                        }, SUCCESS_FADEOUT);
                    }
                });
            }, true);


        }
    };
});
