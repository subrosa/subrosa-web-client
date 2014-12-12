/**
 * @ngdoc module
 * @name subrosa.utils
 *
 * @description
 *  Module for utility related functionality.
 */
angular.module('subrosa.utils', []);

/**
 * @ngdoc constant
 * @name subrosa.utils._
 *
 * @description
 *  Set lodash _ as an angular constant.
 */
/* global window */
angular.module('subrosa.utils').constant('_', window._);
