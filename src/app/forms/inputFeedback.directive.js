/**
 * @ngdoc directive
 * @name subrosa.forms:inputFeedback
 *
 * @requires $compile
 *
 * @description
 *   Provides input level form feedback while submitting a form.
 *   TODO: add notifications from server
 *
 * @example
 *   <div data-input-feedback="passwordForm.newPassword">
 *     <label for="newPassword">New Password</label>
 *     <input id="newPassword" name="newPassword" type="password"
 *          data-ng-model="account.password" required/>
 *   </div>
 */
angular.module('subrosa.forms').directive('inputFeedback', function ($compile) {

    return {
        transclude: true,
        templateUrl: '/app/forms/views/input-feedback.html',
        scope: {
            field: '=inputFeedback',
            warn: '=warn'
        },
        compile: function (element, attributes, tranclude) {
            var icons = element.find('span'),
                helpBlock = element.find('p');

            return function (scope) {
                scope.showSuccess = function (field) {
                    return Boolean(field && field.$dirty && field.$valid);
                };

                scope.showWarning = function (field) {
                    return Boolean(field && field.$dirty && field.$invalid && scope.warn);
                };

                scope.showError = function (field) {
                    return Boolean(field && field.$dirty && field.$invalid && !scope.warn);
                };

                tranclude(scope, function () {
                    var input = element.find('input');

                    icons = $compile(angular.element(icons))(scope);
                    input.after(helpBlock);
                    input.after(icons);
                });
            };
        }
    };
});
