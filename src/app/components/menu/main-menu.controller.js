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

    $scope.isAuthenticated = authService.isAuthenticated;
    $scope.logout = authService.logout;
    $scope.loginWithFb = authService.loginWithFb;
    $scope.user = {};

    $scope.$watch(
        function () {
            return authService.isAuthenticated();
        },
        function (authenticated) {
            if (authenticated) {
                $scope.user = authService.getCurrentUser();
            } else {
                $scope.user = null;
            }
        }
    );
});
