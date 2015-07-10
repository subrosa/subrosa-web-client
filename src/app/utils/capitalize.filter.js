/**
 * @ngdoc filter
 * @name  subrosa.utils:capitalize
 *
 * @description
 *   A filter to capitalize the initial letter of a string.
 *
 * @example
 *   {{ 'blah' | capitalize }} will produce the string "Blah".
 */
angular.module('subrosa.utils').filter('capitalize', function () {
    'use strict';

    return function (input) {
        var capitalized = input;
        if (angular.isString(input)) {
            capitalized = input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
        }
        return capitalized;
    };
});
