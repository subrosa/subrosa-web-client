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
        // controller necessary for input-feedback require to work
        controller: function () {}
    };
});
