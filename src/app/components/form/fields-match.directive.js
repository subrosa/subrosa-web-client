/**
 * @ngdoc directive
 * @name subrosa.components.form:fieldsMatch
 * *
 * @description
 *   Ensure two fields match.
 */
angular.module('subrosa.components.form').directive('fieldsMatch', function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {
                var field1, field2;

                field1 = scope.$eval(attrs.ngModel);
                field2 = scope.$eval(attrs.fieldsMatch);

                return field1 === field2;
            };
            scope.$watch(checker, function (n) {
                control.$setValidity("fieldsMatch", n);
            });
        }
    };
});
