/**
 * @ngdoc directive
 * @name collapsedInHeader
 *
 * @requires $compile
 * @requires collapsedHeaderMenu
 *
 * @description
 *   Add the menu to the top header via the collapsedHeader service.
 *
 * @example
 *   <ul collapsed-in-header>
 *     <li>Some menu item</li>
 *   </ul>
 */
angular.module('subrosa.components.menu').directive('collapsedInHeader', function ($compile, collapsedHeaderMenu) {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            headerState: '@',
            image: '=headerImage'
        },
        link: function (scope, element, attributes, ctrl, transclude) {
            var menuItems = [];

            transclude(function (clone, innerScope) {
                menuItems = $compile(clone.clone())(innerScope);
                element.append(clone);
            });

            collapsedHeaderMenu.setMenu(menuItems);
            collapsedHeaderMenu.setMenuState(scope.headerState);

            scope.$watch('image', function (image) {
                collapsedHeaderMenu.setMenuIcon(image);
            });
        }
    };
});
