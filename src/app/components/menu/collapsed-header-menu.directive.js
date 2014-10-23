/**
 * @ngdoc directive
 * @name collapsedHeaderMenu
 *
 * @requires collapsedHeaderMenu
 *
 * @description
 *   Add the menu to the top header via the collapsedHeader service.
 *
 * @example
 *   <div collapsed-header-menu></div>
 */
angular.module('subrosa.components.menu').directive('collapsedHeaderMenu', function (collapsedHeaderMenu) {
    return {
        restrict: 'AE',
        scope: true,
        link: function (scope, element) {
            scope.$on('menu-items-changed', function () {
                element.empty();
                element.append(collapsedHeaderMenu.getMenu());
            });
        }
    };
});
