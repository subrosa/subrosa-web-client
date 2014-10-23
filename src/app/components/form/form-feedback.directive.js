/**
 * @ngdoc directive
 * @name subrosa.components.form:formFeedback
 *
 * @description
 *   Provides form feedback notifications.
 */
angular.module('subrosa.components.form').directive('formFeedback', function () {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: '/app/components/form/views/form-feedback.html',
        scope: {
            form: '=formFeedback',
            notifications: '=formNotifications'
        },
        link: function (scope) {
            scope.$watch('notifications', function (notifications) {
                angular.forEach(notifications, function (notification) {
                    var field;

                    if (notification.details && notification.details.hasOwnProperty('field')) {
                        field = notification.details.field;
                        if (scope.form.hasOwnProperty(field)) {
                            scope.form[field].$setValidity('server', false);
                            scope.form[field].$dirty = true;
                            scope.form[field].$error.message = notification.details.message;
                        }
                    }
                });
            });
        }
    };
});
