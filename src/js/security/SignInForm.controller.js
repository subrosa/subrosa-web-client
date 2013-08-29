/*global angular */
'use strict';

angular.module('security.form', []);

/*
 * Used to handle authentication..
 */
angular.module('security.form').controller('SignInFormController', function($scope, AuthenticationService, Account) {
    // The model for this form
    $scope.user = {};

    // Default to login form
    $scope.showRegister = false;

    // Any error message from failing to login
    $scope.authError = null;

    $scope.login = function() {
        AuthenticationService.login($scope.user.email, $scope.user.password).then(function() {
            // Successful login
        }, function(exception) {
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

    $scope.register = function() {
        var account = new Account();
        account.account = {
            email: $scope.user.email
        };
        account.password = $scope.user.password;
        account.$save($scope.login);
    };

    $scope.cancelSignIn = function() {
        AuthenticationService.cancelLogin();
    };
});