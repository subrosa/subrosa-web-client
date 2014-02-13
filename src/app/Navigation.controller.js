/**
 * @ngdoc controller
 * @name subrosa.NavigationController
 *
 * @requires $scope
 *
 * @description
 *  Provides functionality to the Navigation Menu.
 */
angular.module('subrosa').controller("NavigationController", function ($scope) {
    $scope.collapsed = true;

    $scope.toggleCollapse = function () {
        $scope.collapsed = !$scope.collapsed;
    };
});