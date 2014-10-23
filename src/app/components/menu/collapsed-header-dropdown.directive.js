/**
 * @ngdoc directive
 * @name collapsedHeaderDropdown
 *
 * @requires collapsedHeaderMenu
 *
 * @description
 *   Add the menu to the top header via the collapsedHeader service.
 *
 * @example
 *   <div collapsed-menus></div>
 */
angular.module('subrosa.components.menu').directive('collapsedHeaderDropdown', function (collapsedHeaderMenu) {
    return {
        restrict: 'AE',
        templateUrl: '/app/components/menu/views/collapsed-header-dropdown.html',
        transclude: true,
        scope: true,
        link: function (scope, element, attributes, ctrl, transclude) {
            scope.hasMenu = false;

            transclude(function (clone) {
                element.prepend(clone);
            });

            scope.$on('menu-items-changed', function () {
                scope.hasMenu = true;
                scope.title = collapsedHeaderMenu.getTitle();
                element.find('ul').append(collapsedHeaderMenu.getMenuItems());
            });
        }
    };
});
