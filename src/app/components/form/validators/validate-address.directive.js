/**
 * @ngdoc directive
 * @name subrosa.components.form:validateAddress
 *
 * @description
 *   Ensures that the field contains a valid integer.
 */
angular.module('subrosa.components.form').directive('validateAddress', function (geocoder) {
    'use strict';

    return {
        restrict: 'AE',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.address = function (address) {
                return geocoder.geocode({address: address});
            };
        }
    };
});
