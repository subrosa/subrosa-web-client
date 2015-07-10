/**
 * @ngdoc directive
 * @name subrosa.components.flash:flashMessages
 *
 * @description
 *   Display for a list of flash messages.
 */
angular.module('subrosa.components.flash').directive('flashMessages', function () {
    'use strict';

    return {
        restrict: 'AE',
        templateUrl: '/app/components/flash/views/flash-messages.html'
    };
});
