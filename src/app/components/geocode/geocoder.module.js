/**
 * @ngdoc module
 * @name subrosa.components.map
 *
 * @description
 *  Module for geocode.
 */
angular.module('subrosa.components.geocode', ['i18n']);

/**
 * @ngdoc constant
 * @name subrosa.components.geocode.google
 *
 * @description
 *   Provides a wrapper around the google global object.
 */
/* global window */
angular.module('subrosa.components.geocode').constant('googleMaps', window.google);
