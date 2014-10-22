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
            title: '@collapsedInHeader'
        },
        link: function (scope, element, attributes, ctrl, transclude) {
            var menuItems = [];

            transclude(function (clone, innerScope) {
                menuItems = $compile(clone.clone())(innerScope);
                element.append(clone);
            });

            scope.$watch('title', function (title) {
                if (title) {
                    collapsedHeaderMenu.setMenu(scope.title, menuItems);
                }
            });
        }
    };
});
