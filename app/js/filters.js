/*globals angular */
'use strict';

/* Filters */
angular.module('subrosa.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);
