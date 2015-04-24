/**
 * @ngdoc directive
 * @name subrosa.utils:focus
 *
 * @description
 *   Focus an input when used in ngShow, for example
 */
angular.module('subrosa.utils').directive('focus', function () {
    return {
        link: function (scope, element) {
            element[0].focus();
        }
    };
});
