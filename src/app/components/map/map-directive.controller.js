/**
 * @ngdoc controller
 * @name subrosa.components.map:map
 *
 * @requires leaflet
 *
 * @description
 *  The controller for the map directive.  Provides common functionality to maps.
 */
angular.module('subrosa.components.map').controller('MapDirectiveController', function ($scope, leaflet) {
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
        minZoom: 3
    };

    if ($scope.allowCurrentLocation === true) {
        var onLocationError =  $scope.onLocationError || function () {},
            control = leaflet.control.locate({onLocationError: onLocationError});

        if (!angular.isArray($scope.controls.custom)) {
            $scope.controls.custom = [];
        }
        $scope.controls.custom.push(control);
    }
});
