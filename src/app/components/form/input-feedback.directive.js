/**
 * @ngdoc directive
 * @name subrosa.components.form:inputFeedback
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
angular.module('subrosa.components.form').directive('inputFeedback', function () {
    function getInput(element) {
        var input = element.find('input');

        if (input.length === 0) {
            input = element.find('select');

            if (input.length === 0) {
                input = element.find('textarea');
            }
        }

        return input;
    }

    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        templateUrl: '/app/components/form/views/input-feedback.html',
        scope: {
            field: '=inputFeedback',
            warn: '=warn'
        },
        link: function (scope, element, attrs, controller, transclude) {
            var input = getInput(element);

            transclude(function (clone) {
                element.prepend(clone);
                input = getInput(element);
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
