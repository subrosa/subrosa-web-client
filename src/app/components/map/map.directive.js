/**
 * @ngdoc directive
 * @name subrosa.components.map:map
 *
 * @requires leaflet
 * @requires leafletData
 * @requires i18n
 *
 * @description
 *  A wrapper around leaflet-directive.
 */
angular.module('subrosa.components.map').directive('map', function (leaflet, leafletData, i18n) {
    return {
        restrict: 'AE',
        transclude: true,
        controller: 'MapDirectiveController',
        templateUrl: '/app/components/map/views/map.html',
        scope: {
            id: '@map',
            allowCurrentLocation: '=allowCurrentLocation',
            center: '=?center',
            onLocationSuccess: '=onLocationSuccess',
            onLocationError: '=onLocationError'
        },
        link: function (scope) {
            leafletData.getMap(scope.id).then(function (mapElement) {
                var zoomControl = leaflet.control.zoom({
                    zoomInTitle: i18n('Zoom in'),
                    zoomOutTitle: i18n('Zoom out')
                });
                mapElement.addControl(zoomControl);
            });
        }
    };
});

