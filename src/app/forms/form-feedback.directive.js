/**
 * @ngdoc directive
 * @name subrosa.forms:formFeedback
 *
 * @description
 *   Provides form feedback notifications.
 */
angular.module('subrosa.forms').directive('formFeedback', function () {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: '/app/forms/views/form-feedback.html',
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
                            scope.form[field].$error.message = notification.details.message;
                        }
                    }
                });
            });
        }
    };
});
