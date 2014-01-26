/**
 * @ngdoc controller
 * @name subrosa.account.SessionController
 *
 * @requires $scope
 * @requires $http
 * @requires AuthService
 *
 * @description
 *  Handle submission of the login form.
 */
angular.module('subrosa.account').controller('SessionController', function ($scope, $http, $log, AuthService) {

    $scope.user = {};
    $scope.isAuthenticated = AuthService.isAuthenticated;
    $scope.getCurrentUser = AuthService.getCurrentUser;

    $scope.login = function () {
        return $http.post('/subrosa/v1/session', $scope.user)
            .success(function (data) {
                AuthService.loginConfirmed(data);
            })
            .error(function (data, status) {
                if (status === '401') {
                    $scope.authError = true;
                } else {
                    $scope.unknownError = true;
                    $log.error(data);
                }
                // Ensure the user does not have a session
                AuthService.destroySession();
            });
    };

    $scope.logout = function () {
        $http.post('/subrosa/v1/logout').then(function () {
            AuthService.destroySession();
        });
    };
});
