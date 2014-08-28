/**
 * @ngdoc service
 * @name subrosa.components.map:mapDraw
 *
 * @requires leaflet
 *
 * @description
 *  A service to handle map drawing.
 */
angular.module('subrosa.components.map').service('mapDraw', function (leaflet) {
    var drawOptions = {
        draw: {
            circle: false,
            marker: false,
            polyline: false,
            rectangle: false
        },
        edit: {
            edit: false,
            remove: false
        }
    };

    this.getOptions = function () {
        return drawOptions;
    };

    this.addControls = function (map, drawnItems) {
        drawOptions.edit.featureGroup = drawnItems;
        map.addControl(new leaflet.Control.Draw(drawOptions));
    };

    this.registerCreateHandler = function (map, handler) {
        map.on('draw:created', handler);
    };
    
    this.registerDeleteHandler = function (map, handler) {
        drawOptions.edit.remove = true;
        map.on('draw:deleted', handler);
    };

    this.registerEditHandler = function (map, handler) {
        drawOptions.edit.edit = true;
        map.on('draw:edited', handler);
    };
});
