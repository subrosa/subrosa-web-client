/**
 * @ngdoc directive
 * @name security:userMenu
 *
 * @requires AuthService
 *
 * @description
 *   A reusable widget that can show login or logout buttons
 *   and information the current authenticated user.
 */
angular.module('subrosa.security').directive('userMenu', function (AuthService) {
    return {
        templateUrl: '/app/security/views/user-menu.html',
        replace: true,
        link: function ($scope) {
            $scope.isAuthenticated = AuthService.isAuthenticated;
            $scope.logout = AuthService.logout;
            $scope.$watch(function () {
                return AuthService.currentUser;
            }, function (currentUser) {
                $scope.currentUser = currentUser;
            });
        }
    };
});
