/**
 * @ngdoc directive
 * @name subrosa.components.map:mapPolygons
 *
 * @requires leaflet
 * @requires leafletData
 * @requires mapDraw
 *
 * @description
 *  Used to add polygons to an already existing map
 */
angular.module('subrosa.components.map').directive('mapPolygons', function (leaflet, leafletData, mapDraw) {
    'use strict';

    var SHAPE_COLOR = '#E43E59';

    return {
        restrict: 'AE',
        require: '^map',
        scope: {
            polygons: '=mapPolygons',
            draw: '=draw',
            onCreate: '&onCreate',
            onDelete: '&onDelete',
            onEdit: '&onEdit'
        },
        link: function (scope, element, attributes, MapController) {
            var shapes = MapController.shapes;

            leafletData.getMap(MapController.mapId).then(function (mapElement) {
                if (scope.draw) {
                    if (attributes.onCreate) {
                        mapDraw.registerCreateHandler(mapElement, function (event) {
                            shapes.addLayer(event.layer);
                            scope.onCreate({event: event});
                        });
                    }

                    if (attributes.onDelete) {
                        mapDraw.registerDeleteHandler(mapElement, function (event) {
                            shapes.removeLayer(event.layer);
                            scope.onDelete({event: event});
                        });
                    }

                    if (attributes.onEdit) {
                        mapDraw.registerEditHandler(mapElement, function (event) {
                            scope.onEdit({event: event});
                        });
                    }

                    mapDraw.addControls(mapElement, shapes);
                }

                scope.polygons.$promise.then(function (polygons) {
                    // Add the shapes layer
                    mapElement.addLayer(shapes);

                    angular.forEach(polygons, function (polygon) {
                        var latLngs = [];
                        angular.forEach(polygon.points, function (point) {
                            latLngs.push(leaflet.latLng(point.latitude, point.longitude));
                        });
                        if (latLngs.length > 0) {
                            polygon = new leaflet.polygon(latLngs, {color: SHAPE_COLOR});
                            shapes.addLayer(polygon);
                        }
                    });

                    if (shapes.getLayers().length > 0) {
                        mapElement.fitBounds(shapes.getBounds());
                    }
                });
            });
        }
    };
});

