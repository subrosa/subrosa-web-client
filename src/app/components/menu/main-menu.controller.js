/**
 * @ngdoc controller
 * @name subrosa.components.menu.MainMenuController
 *
 * @requires $scope
 * @requires authService
 *
 * @description
 *  Provides functionality to the Main Menu.
 */
angular.module('subrosa.components.menu').controller("MainMenuController", function ($scope, authService) {
    $scope.collapsed = {
        account: true,
        main: true
    };

    $scope.logout = authService.logout;
});
