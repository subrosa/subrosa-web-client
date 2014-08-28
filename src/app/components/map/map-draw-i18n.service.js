/**
 * @ngdoc service
 * @name subrosa.components.map:mapDrawI18n
 *
 * @requires leaflet
 * @requires i18n
 *
 * @description
 *  A service to encapsulate setting the large amount of leaflet.draw strings.
 */
angular.module('subrosa.components.map').service('mapDrawI18n', function (leaflet, i18n) {
    this.setStrings = function () {
        leaflet.drawLocal.draw.toolbar.actions = {
            title: i18n('Cancel drawing'),
            text: i18n('Cancel')
        };

        leaflet.drawLocal.draw.toolbar.undo = {
            title: i18n('Remove the last point drawn'),
            text: i18n('Remove the last point')
        };

        leaflet.drawLocal.draw.toolbar.buttons = {
            polygon: i18n('Draw a polygon'),
            rectangle: i18n('Draw a rectangle')
        };

        leaflet.drawLocal.draw.handlers.polygon = {
            tooltip: {
                start: i18n('Click to start drawing shape.'),
                cont: i18n('Click to continue drawing shape.'),
                end: i18n('Click first point to close this shape.')
            }
        };

        leaflet.drawLocal.draw.handlers.rectangle = {
            tooltip: {
                start: i18n('Click and drag to draw rectangle.')
            }
        };

        leaflet.drawLocal.edit = {
            toolbar: {
                actions: {
                    save: {
                        title: i18n('Save changes.'),
                        text: i18n('Save')
                    },
                    cancel: {
                        title: i18n('Cancel editing, discards all changes.'),
                        text: i18n('Cancel')
                    }
                },
                buttons: {
                    edit: i18n('Edit layers.'),
                    editDisabled: i18n('No layers to edit.'),
                    remove: i18n('Delete layers.'),
                    removeDisabled: i18n('No layers to delete.')
                }
            },
            handlers: {
                edit: {
                    tooltip: {
                        text: i18n('Drag handles to edit shape.'),
                        subtext: i18n('Click cancel to undo changes.')
                    }
                },
                remove: {
                    tooltip: {
                        text: i18n('Click on a shape to remove')
                    }
                }
            }
        };
    };
});
