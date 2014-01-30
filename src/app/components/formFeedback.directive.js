/**
 * @ngdoc directive
 * @name subrosa.components:formFeedback
 * *
 * @description
 *   Provides form feedback alerts.
 */
angular.module('subrosa.components').directive('formFeedback', function () {

    return {
        templateUrl: '/app/components/views/form-feedback.html',
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
