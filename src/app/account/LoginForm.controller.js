/**
 * @ngdoc controller
 * @name subrosa.account.LoginFormController
 *
 * @requires $scope
 * @requires $http
 * @requires AuthService
 *
 * @description
 *  Handle submission of the login form.
 */
angular.module('subrosa.account').controller('LoginFormController', function ($scope, $http, $log, AuthService) {
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
                // Ensure the user does not have a token
                AuthService.logout();
            });
    };

//    $scope.login = function (deferred) {
//        $http.post('/subrosa/v1/session', $scope.user)
//            .success(function (data) {
//                AuthService.loginConfirmed(data);
//                deferred.resolve();
//            })
//            .error(function (data, status) {
//                if (status === '401') {
//                    $scope.authError = true;
//                } else {
//                    $scope.unknownError = true;
//                    $log.error(data);
//                }
//                // Ensure the user does not have a token
//                AuthService.logout();
//                deferred.reject(status);
//            });
//    };
});
