/**
 * @ngdoc directive
 * @name subrosa.components.modal:modal
 *
 * @requires modalCache
 *
 * @description
 *   Registers a modal dialog with the modalCache so it can be opened later.
 */
angular.module('subrosa.components.modal').directive('modal', function (modalCache) {
    'use strict';

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            id: '@modal',
            template: '@templateUrl'
        },
        link: function (scope) {
            modalCache.put(scope.id, scope.template);
        }
    };
});
