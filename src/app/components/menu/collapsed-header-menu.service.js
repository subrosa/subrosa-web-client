/**
 * @ngdoc service
 * @name collapsedHeaderMenu
 *
 * @requires $rootScope
 *
 * @description
 *  A service to get and set menu items to be displayed in the collapsed header menu.
 */
angular.module('subrosa.components.menu').service('collapsedHeaderMenu', function ($rootScope) {
    var menuItems = [], menuState = null, menuIcon = null;

    this.getMenu = function () {
        return menuItems;
    };

    this.getMenuState = function () {
        return menuState;
    };

    this.getMenuIcon = function () {
        return menuIcon;
    };

    this.setMenu = function (items) {
        menuItems = items;
        $rootScope.$broadcast('menu-items-changed');
    };

    this.setMenuState = function (stateName) {
        menuState = stateName;
    };

    this.setMenuIcon = function (image) {
        menuIcon = image;
        $rootScope.$broadcast('menu-items-changed');
    };

});
