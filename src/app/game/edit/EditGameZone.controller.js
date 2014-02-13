/**
 * @ngdoc controller
 * @name subrosa.game.EditGameZoneController
 *
 * @requires $scope
 * @requires leaflet
 * @requires leafletData
 * @requires GameZone
 *
 * @description
 *  Handles the editing of game zones.
 */
angular.module('subrosa.game').controller('EditGameZoneController', function ($scope, leaflet, leafletData, GameZone) {
    var map, getLayerData, locationFound, locationError, drawCreated, drawEdited, drawDeleted;

    $scope.center = {
        lat: 40.67,
        lng: -73.94,
        zoom: 6
    };

    // Initialize the FeatureGroup to store editable layers
    $scope.drawnItems = new leaflet.FeatureGroup();

    $scope.controls = {
        draw: {
            options: {
                draw: {
                    circle: false,
                    marker: false,
                    polyline: false
                },
                edit: {
                    featureGroup: $scope.drawnItems
                }
            }
        }
    };

    getLayerData = function (layer) {
        return {points: layer._latlngs};
    };

    locationFound = function (event) {
        var radius = event.accuracy / 2;
        leaflet.circle(event.latlng, radius).addTo(map);
    };

    locationError = function () {
        $scope.rejectedGeolocation = true;
    };

    drawCreated = function (event) {
        var layer = event.layer, success, error;

        success = function (response) {
            layer.id = response.id;
            $scope.drawnItems.addLayer(layer);
        };

        error = function (response) {
            $scope.notifications = response.data.notifications;
        };

        GameZone.save({gameUrl: $scope.$stateParams.gameUrl}, getLayerData(layer), success, error);
    };

    drawEdited = function (event) {
        angular.forEach(event.layers.getLayers(), function (layer) {
            GameZone.update({id: layer.id, gameUrl: $scope.$stateParams.gameUrl}, getLayerData(layer));
        });
    };

    drawDeleted = function (event) {
        angular.forEach(event.layers.getLayers(), function (layer) {
            GameZone.remove({id: layer.id, gameUrl: $scope.$stateParams.gameUrl});
        });
    };

    leafletData.getMap().then(function (mapElement) {
        map = mapElement;

        // Attempt to find the user's current location
        map.locate({setView: true, maxZoom: 16});

        // Add the drawn items layer
        map.addLayer($scope.drawnItems);

        // Handle events
        map.on('locationfound', locationFound);
        map.on('locationerror', locationError);
        map.on('draw:created', drawCreated);
        map.on('draw:edited', drawEdited);
        map.on('draw:deleted', drawDeleted);
    });
});

