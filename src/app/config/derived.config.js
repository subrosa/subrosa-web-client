/**
 * @ngdoc constant
 * @name subrosa.config.google
 *
 * @requires $provide
 * @requires API_CONFIG
 *
 * @description
 *   Provide configurations that are derived.
 */
angular.module('subrosa.config').config(function ($provide, API_CONFIG) {
    'use strict';

    API_CONFIG.URL = API_CONFIG.BASE_URL + '/v' + API_CONFIG.VERSION;
    $provide.constant("API_CONFIG", API_CONFIG);
});

