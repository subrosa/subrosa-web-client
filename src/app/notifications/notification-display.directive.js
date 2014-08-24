/**
 * @ngdoc directive
 * @name subrosa.notifications:notificationDisplay
 *
 * @description
 *   Provides a display for error and success notifications.
 */
angular.module('subrosa.notifications').directive('notificationDisplay', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/notifications/views/notification-display.html',
        scope: {
            notifications: '=notificationDisplay'
        },
        link: function (scope) {
            scope.closeNotification = function (index) {
                scope.notifications.splice(index, 1);
            };

            scope.$watch('notifications', function (notifications) {
                angular.forEach(notifications, function (notification) {
                    if (notification.hasOwnProperty('severity')) {
                        notification.type = notification.severity.toLowerCase();
                    }

                    // For automatic bootstrap 3 styling (they use danger instead of error)
                    if (notification.type === 'error') {
                        notification.type = 'danger';
                    }
                });
            }, true);
        }
    };
});
