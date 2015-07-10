/**
 * @ngdoc controller
 * @name subrosa.components.map:map
 *
 * @requires $scope
 * @requires leaflet
 * @requires i18n
 * @requires units
 *
 * @description
 *  The controller for the map directive.  Provides common functionality to maps and sets defaults.
 */
angular.module('subrosa.components.map').controller('MapDirectiveController', function ($scope, leaflet, i18n, units) {
    'use strict';

    this.mapId = $scope.id;
    this.controls = {};  // Default to empty object, otherwise angular-leaflet errors
    this.shapes = new leaflet.FeatureGroup();

    $scope.controls = this.controls;

    $scope.center = {
        lat: 30,
        lng: -15,
        zoom: 3
    };

    $scope.options = {
        minZoom: 3,
        zoomControl: false
    };

    if ($scope.allowCurrentLocation === true) {
        var onLocationError =  $scope.onLocationError || function () {},
            control = leaflet.control.locate({
                onLocationError: onLocationError,
                metric: units.metric,
                strings: {
                    title: i18n('Show me where I am'),
                    popup: i18n('You are within {distance} {unit} from this point'),
                    outsideMapsBoundsMsg: i18n('You seem located outside the boundaries of the map')
                }
            });

        if (!angular.isArray($scope.controls.custom)) {
            $scope.controls.custom = [];
        }
        $scope.controls.custom.push(control);
    }
});
