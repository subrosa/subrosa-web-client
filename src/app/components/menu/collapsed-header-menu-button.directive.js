/**
 * @ngdoc directive
 * @name collapsedHeaderMenuButton
 *
 * @requires collapsedHeaderMenuButton
 *
 * @description
 *   Add the menu to the top header via the collapsedHeader service.
 *
 * @example
 *   <button collapsed-header-menu-image></button>
 */
angular.module('subrosa.components.menu').directive('collapsedHeaderMenuButton', function ($state, collapsedHeaderMenu) {
    return {
        restrict: 'AE',
        templateUrl: '/app/components/menu/views/collapsed-header-menu-button.html',
        transclude: true,
        scope: true,
        link: function (scope, element, attributes, ctrl, transclude) {
            scope.$parent.showMenu = false;

            transclude(function (clone) {
                element.append(clone);
            });

            scope.$on('menu-items-changed', function () {
                scope.image = collapsedHeaderMenu.getMenuIcon();
                scope.$parent.showMenu = collapsedHeaderMenu.getMenu().length > 0;
            });

            scope.$on('$stateChangeSuccess', function () {
                scope.$parent.showMenu = $state.includes(collapsedHeaderMenu.getMenuState());
            });
        }
    };
});
