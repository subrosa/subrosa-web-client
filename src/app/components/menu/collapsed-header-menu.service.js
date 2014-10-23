/**
 * @ngdoc service
 * @name collapsedHeaderMenu
 *
 * @description
 *  A service to get and set menu items to be displayed in the collapsed header menu.
 */
angular.module('subrosa.components.menu').service('collapsedHeaderMenu', function ($rootScope) {
    var menuItems = [], menuTitle = '';

    this.getTitle = function () {
        return menuTitle;
    };

    this.getMenuItems = function () {
        return menuItems;
    };

    this.setMenu = function (title, items) {
        menuItems = items;
        menuTitle = title;
        $rootScope.$broadcast('menu-items-changed');
    };
});
