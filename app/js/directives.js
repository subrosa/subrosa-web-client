/*globals angular */
'use strict';

/* Directives */
angular.module('subrosa.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);
