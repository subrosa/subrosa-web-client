/**
 * @ngdoc directive
 * @name subrosa.components.map:map
 *
 * @description
 *  A wrapper around leaflet-directive.
 */
angular.module('subrosa.components.map').directive('map', function () {
    return {
        restrict: 'A',
        transclude: true,
        controller: 'MapDirectiveController',
        templateUrl: '/app/components/map/views/map.html',
        scope: {
            id: '@map',
            allowCurrentLocation: '=allowCurrentLocation',
            center: '=?center',
            onLocationSuccess: '=onLocationSuccess',
            onLocationError: '=onLocationError'
        }
    };
});

