/*global angular*/
'use strict';

// The User Menu directive is a reusable widget that can show login or logout buttons
// and information the current authenticated user
angular.module('security.directives').directive('userMenu', function (AuthenticationService) {
    return {
        templateUrl: 'views/security/user-menu.html',
        replace: true,
        link: function ($scope) {
            $scope.isAuthenticated = AuthenticationService.isAuthenticated;
            $scope.login = AuthenticationService.showLogin;
            $scope.logout = AuthenticationService.logout;
            $scope.$watch(function () {
                return AuthenticationService.currentUser;
            }, function (currentUser) {
                $scope.currentUser = currentUser;
            });
        }
    };
});
