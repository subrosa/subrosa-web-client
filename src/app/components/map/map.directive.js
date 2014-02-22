/**
 * @ngdoc directive
 * @name subrosa.components.map:map
 *
 * @requires leaflet
 * @requires leafletData
 *
 * @description
 *  A wrapper around leaflet-directive.
 */
angular.module('subrosa.components.map').directive('map', function (leaflet, leafletData) {
    var SHAPE_COLOR = '#E43E59';

    return {
        templateUrl: '/app/components/map/views/map.html',
        controller: 'MapController',
        scope: {
            allowCurrentLocation: '=allowCurrentLocation',
            allowEdit: '=allowEdit',
            center: '=?center',
            onLocationError: '=onLocationError',
            onCreated: '&onCreated',
            onDeleted: '&onDeleted',
            onEdited: '&onEdited',
            polygons: '=polygons'
        },
        compile: function (element) {
            // Set a random id on the element
            var id = Math.floor((Math.random() * 1000) + 1);
            angular.element(element.children()[0]).attr('id', id);

            return function (scope) {
                // Initialize the FeatureGroup to store shape layers
                scope.shapes = new leaflet.FeatureGroup();

                if (scope.allowCurrentLocation === true) {
                    var control = leaflet.control.locate({onLocationError: scope.onLocationError});
                    if (!angular.isArray(scope.controls.custom)) {
                        scope.controls.custom = [];
                    }
                    scope.controls.custom.push(control);
                }

                if (scope.allowEdit === true) {
                    // TODO move this into controller
                    scope.controls.draw.options.edit = {
                        featureGroup: scope.shapes
                    };

                    scope.createLayer = function (event) {
                        scope.shapes.addLayer(event.layer);
                        scope.onCreated({event: event});
                    };

                    scope.editLayer = function (event) {
                        scope.onEdited({event: event});
                    };

                    scope.deleteLayer = function (event) {
                        scope.shapes.removeLayer(event.layer);
                        scope.onDeleted({event: event});
                    };

                    leafletData.getMap(id).then(function (mapElement) {
                        // Add the shapes layer
                        mapElement.addLayer(scope.shapes);

                        // Handle events
                        mapElement.on('draw:created', scope.createLayer);
                        mapElement.on('draw:deleted', scope.deleteLayer);
                        mapElement.on('draw:edited', scope.editLayer);
                        leafletData.setMap(mapElement, id);
                    });
                }

                if (scope.polygons) {
                    leafletData.getMap(id).then(function (mapElement) {
                        // Add the shapes layer
                        mapElement.addLayer(scope.shapes);

                        // TODO this shouldn't require a $promise
                        if (scope.polygons.$promise) {
                            scope.polygons.$promise.then(function (polygons) {
                                angular.forEach(polygons, function (polygon) {
                                    var latLngs = [];
                                    angular.forEach(polygon.points, function (point) {
                                        latLngs.push(leaflet.latLng(point.latitude, point.longitude));
                                    });
                                    if (latLngs.length > 0) {
                                        polygon = new leaflet.polygon(latLngs, {color: SHAPE_COLOR});
                                        scope.shapes.addLayer(polygon);
                                        mapElement.fitBounds(polygon.getBounds());
                                    }
                                });
                                leafletData.setMap(mapElement, id);
                            });
                        }
                    });
                }
            };
        }
    };
});

