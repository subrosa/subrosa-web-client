/**
 * @ngdoc directive
 * @name subrosa.forms:inputFeedback
 *
 * @description
 *   Provides input level form feedback while submitting a form.
 *
 * @example
 *   <div data-input-feedback="passwordForm.newPassword">
 *     <label for="newPassword">New Password</label>
 *     <input id="newPassword" name="newPassword" type="password"
 *          data-ng-model="account.password" required/>
 *   </div>
 */
angular.module('subrosa.forms').directive('inputFeedback', function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/app/forms/views/input-feedback.html',
        scope: {
            field: '=inputFeedback',
            warn: '=warn'
        },
        link: function (scope, element, attrs, controller, transclude) {
            var input = element.find('input');

            transclude(function (clone) {
                element.append(clone);
                input = element.find('input');
                input.after(element.find('p'));
            });

            scope.min = input.attr('min');
            scope.max = input.attr('max');

            scope.hasSuccess = function (field) {
                return Boolean(field && field.$dirty && field.$valid);
            };

            scope.hasWarning = function (field) {
                return Boolean(scope.warn && field && field.$dirty && field.$invalid);
            };

            scope.hasError = function (field) {
                return Boolean(!scope.warn && field && field.$dirty && field.$invalid);
            };
        }
    };
});
