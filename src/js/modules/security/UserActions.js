/*global angular*/
'use strict';

// The loginToolbar directive is a reusable widget that can show login or logout buttons
// and information the current authenticated user
angular.module('security').directive('userActions', function (AuthenticationService) {
    var directive = {
        templateUrl: 'views/security/user-actions.html',
        replace: true,
        scope: true,
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
    return directive;
});
