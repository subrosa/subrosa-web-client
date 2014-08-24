/**
 * @ngdoc module
 * @name subrosa.components.map
 *
 * @description
 *  Module for maps.
 */
angular.module('subrosa.components.map', ['i18n', 'leaflet-directive']);

/**
 * @ngdoc constant
 * @name subrosa.components.map.leaflet
 *
 * @description
 *  Set leaflet global L as an angular constant.
 */
/* global window */
angular.module('subrosa.components.map').constant('leaflet', window.L);

/**
 * @ngdoc constant
 * @name subrosa.components.map.google
 *
 * @description
 *   Provides a wrapper around the google global object.
 */
/* global window */
angular.module('subrosa.components.map').constant('googleMaps', window.google);

/**
 * @ngdoc run
 * @name subrosa.components.map.run
 *
 * @requires leaflet
 *
 * @description
 *  Set the default image path if it's not already set (production mode).
 */
angular.module('subrosa.components.map').run(function (leaflet) {
    if (leaflet && !leaflet.Icon.Default.imagePath) {
        leaflet.Icon.Default.imagePath = '/css/images/';
    }
});
