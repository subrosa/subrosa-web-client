/**
 * @ngdoc directive
 * @name subrosa.forms:integerValidator
 *
 * @description
 *   Ensures that the field contains a valid integer.
 */
angular.module('subrosa.forms').directive('validateInteger', function () {
    var INTEGER_REGEXP = /^\-?\d+$/;

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});
