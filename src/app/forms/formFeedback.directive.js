/**
 * @ngdoc directive
 * @name subrosa.forms:formFeedback
 * *
 * @description
 *   Provides form feedback alerts.
 */
angular.module('subrosa.forms').directive('formFeedback', function () {

    return {
        templateUrl: '/app/forms/views/form-feedback.html',
        scope: {
            alerts: '=formFeedback'
        },
        link: function (scope) {
            scope.closeAlert = function (index) {
                scope.alerts.splice(index, 1);
            };
        }
    };
});
