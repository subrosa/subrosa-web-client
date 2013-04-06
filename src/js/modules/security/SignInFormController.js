/*global angular */
'use strict';

angular.module('security.form', []);

/*
 * Used to handle authentication..
 */
angular.module('security.form').controller('SignInFormController', function ($scope, AuthenticationService) {
    // The model for this form
    $scope.user = {};

    // Any error message from failing to login
    $scope.authError = null;

//    // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
//    // We could do something different for each reason here but to keep it simple...
//    $scope.authReason = null;
//    if ( security.getLoginReason() ) {
//        $scope.authReason = ( security.isAuthenticated() ) ?
//            localizedMessages.get('login.reason.notAuthorized') :
//            localizedMessages.get('login.reason.notAuthenticated');
//    }

    $scope.login = function () {
        AuthenticationService.login($scope.user.email, $scope.user.password).then(function () {

        }, function (exception) {
            // Clear any previous security errors
            $scope.authError = null;
            if (exception.status === 401) {
                // If we get here then the login failed due to bad credentials
                $scope.authError = "Invalid credentials.";
            } else {
                // If we get here then there was a problem with the login request to the server
                $scope.authError = "Something went wrong, please try again.";
            }
        });
    };

    $scope.clearForm = function () {
        $scope.user = {};
    };

    $scope.cancelLogin = function () {
        AuthenticationService.cancelLogin();
    };
});