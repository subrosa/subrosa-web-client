/**
 * @ngdoc controller
 * @name subrosa.account.SessionController
 *
 * @requires $scope
 * @requires AuthService
 *
 * @description
 *  Handle submission of the login form.
 */
angular.module('subrosa.account').controller('LoginFormController', function ($scope, AuthService) {

    $scope.user = {};
    $scope.errors = {
        authError: false,
        unknownError: false
    };

    $scope.login = function () {
        AuthService.login($scope.user).error(function (data, status) {
            if (status === 401) {
                $scope.errors.authError = true;
            } else {
                $scope.errors.unknownError = true;
            }
        });
    };
});
