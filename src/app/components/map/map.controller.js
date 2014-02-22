/**
 * @ngdoc controller
 * @name subrosa.components.map:MapController
 *
 * @requires $scope
 *
 * @description
 *  Controller for map directive which sets up some defaults on the $scope.
 */
angular.module('subrosa.components.map').controller('MapController', function ($scope) {
    var defaultCenter, defaultControls, defaultDrawControls, defaultOptions;

    defaultCenter = {
        lat: 30,
        lng: -15,
        zoom: 3
    };

    defaultControls = {};

    defaultDrawControls = {
        options: {
            draw: {
                circle: false,
                marker: false,
                polyline: false,
                rectangle: false
            }
        }
    };

    defaultOptions = {};

    $scope.center = defaultCenter;
    $scope.controls = defaultControls;
    $scope.options = defaultOptions;

    if ($scope.allowEdit === true) {
        $scope.controls.draw = defaultDrawControls;
    }
});
