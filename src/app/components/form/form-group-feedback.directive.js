/**
 * @ngdoc directive
 * @name subrosa.components.form:formGroupFeedback
 *
 * @requires $interpolate
 *
 * @description
 *   Provides input level form feedback while submitting a form.
 *
 * @example
 *   <div data-form-group-feedback="passwordForm.newPassword">
 *     <label for="newPassword">New Password</label>
 *     <input id="newPassword" name="newPassword" type="password"
 *          data-ng-model="account.password" required/>
 *   </div>
 */
angular.module('subrosa.components.form').directive('formGroupFeedback', function ($interpolate, $timeout) {
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
        require: '^form',
        transclude: true,
        templateUrl: '/app/components/form/views/form-group-feedback.html',
        scope: {
            warn: '='
        },
        link: function (scope, element, attributes, form, transclude) {
            var input, inputName;

            scope.field = {};

            // Workaround for https://github.com/angular/angular.js/issues/5489
            transclude(scope.$parent, function (content) {
                element.children().prepend(content);
                input = getInput(element);
                inputName = input.attr('name');

                if (!inputName) {
                    throw ("Must set name attribute on input to use formGroupFeedback." + '\n' + element.html());
                }

                // Get the interpolated value of the name attribute
                inputName = $interpolate(input.attr('name'))(input.scope());

                // TODO: find a way to remove this $timeout
                $timeout(function () {
                    scope.field = form[inputName];
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
            });
        }
    };
});
