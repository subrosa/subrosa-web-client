/**
 * @ngdoc directive
 * @name subrosa.forms:formFeedback
 *
 * @description
 *   Provides form feedback notifications.
 */
angular.module('subrosa.forms').directive('formFeedback', function () {

    return {
        transclude: true,
        templateUrl: '/app/forms/views/form-feedback.html',
        scope: {
            notifications: '=formFeedback'
        },
        controller: function ($scope) {
            this.getNotifications = function () {
                return $scope.notifications;
            };
        },
        link: function (scope) {
            scope.$watch('notifications', function (notifications) {
                angular.forEach(notifications, function (notification) {
                    notification.type = notification.severity.toLowerCase();

                    // For automatic bootstrap 3 styling (they use danger instead of error)
                    if (notification.severity === 'ERROR') {
                        notification.type = 'danger';
                    }
                });
            });

            scope.closeNotification = function (index) {
                scope.notifications.splice(index, 1);
            };
        }
    };
});
