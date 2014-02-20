/**
 * @ngdoc module
 * @name subrosa.components.map
 *
 * @description
 *  Module for maps.
 */
angular.module('subrosa.components.map', ['leaflet-directive']);

/**
 * @ngdoc constant
 * @name subrosa.components.map.leaflet
 *
 * @description
 *  Set leaflet global L as an angular constant.
 *  TODO make directive out of GameZoneController logic and add to module
 */
/* global window */
angular.module('subrosa.components.map').constant('leaflet', window.L);