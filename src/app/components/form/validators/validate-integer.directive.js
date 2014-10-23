/**
 * @ngdoc directive
 * @name subrosa.components.form:integerValidator
 *
 * @description
 *   Ensures that the field contains a valid integer.
 */
angular.module('subrosa.components.form').directive('validateInteger', function () {
    var INTEGER_REGEXP = /^\-?\d+$/;

    return {
        restrict: 'AE',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.integer = function (value) {
                var valid = false;
                if (INTEGER_REGEXP.test(value)) {
                    valid = true;
                }
                return valid;
            };
        }
    };
});
