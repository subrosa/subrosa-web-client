/**
 * @ngdoc controller
 * @name subrosa.MainMenuController
 *
 * @requires $scope
 * @requires authService
 *
 * @description
 *  Provides functionality to the Main Menu.
 */
angular.module('subrosa').controller("MainMenuController", function ($scope, authService) {
    $scope.collapsed = {
        left: true,
        right: true
    };

    $scope.isAuthenticated = authService.isAuthenticated;
    $scope.logout = authService.logout;
    $scope.user = {};

    $scope.$watch(function () {
        return authService.isAuthenticated();
    }, function (authenticated) {
        if (authenticated) {
            authService.getCurrentUser().then(function (user) {
                $scope.user = user;
            });
        } else {
            $scope.user = null;
        }
    });
});
