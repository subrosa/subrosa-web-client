/*global angular*/
'use strict';

angular.module('security.auth', ['security.form', 'ui.bootstrap.dialog']);

// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.auth').factory('AuthenticationService', function ($http, $q, $location, SecurityRetryQueue, $dialog) {

    // Login form dialog stuff
    // TODO move this elsewhere?
    var loginDialog = null;
    function openLoginDialog() {
        if (!loginDialog) {
            loginDialog = $dialog.dialog();
            loginDialog.open('views/security/sign-in-form.html', 'SignInFormController').then(onLoginDialogClose);
        }
    }
    function closeLoginDialog(success) {
        if (loginDialog) {
            loginDialog.close(success);
            loginDialog = null;
        }
    }
    function onLoginDialogClose(success) {
        if (success) {
            SecurityRetryQueue.retryAll();
        } else {
            SecurityRetryQueue.cancelAll();
            redirect();
        }
    }

    function isDialogOpen() {
        return !!loginDialog;
    }

    // Redirect to the given url (defaults to '/')
    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }

    // Register a handler for when an item is added to the retry queue
    SecurityRetryQueue.onItemAddedCallbacks.push(function () {
        if (SecurityRetryQueue.hasMore()) {
            service.showLogin();
        }
    });

    // The public API of the service
    var service = {

        // Get the first reason for needing a login
        getLoginReason: function () {
            return SecurityRetryQueue.retryReason();
        },

        isDialogOpen: function () {
            return isDialogOpen();
        },

        // Show the modal login dialog
        showLogin: function () {
            openLoginDialog();
        },

        // Attempt to authenticate a user by the given email and password
        login: function (email, password) {
            var postData = "email=" + email + "&password=" + password;
            var config = {headers: {"Content-Type": "application/x-www-form-urlencoded"}};
            var request = $http.post('/subrosa/v1/authenticate', postData, config);

            var success = function () {
                service.currentUser = service.getCurrentUser();
                if (service.isAuthenticated()) {
                    closeLoginDialog(true);
                }
            };

            var error = function (exception) {
                // TODO log exception somewhere
                throw exception;
            };

            return request.then(success, error);
        },

        // Give up trying to login and clear the retry queue
        cancelLogin: function () {
            closeLoginDialog(false);
            redirect();
        },

        // Logout the current user and redirect
        logout: function (redirectTo) {
            $http.post('/subrosa/v1/logout').then(function () {
                service.currentUser = null;
                redirect(redirectTo);
            });
        },

        // Ask the backend to see if a user is already authenticated - this may be from a previous session.
        getCurrentUser: function () {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                var success = function (response) {
                    service.currentUser = response.data;
                    return service.currentUser;
                };
                var error = function (response) {
                    if (response.status === 403) {
                        service.currentUser = null;
                    }
                };
                return $http.get('/subrosa/v1/user').then(success, error);
            }
        },

        // Information about the current user
        currentUser: null,

        // Is the current user authenticated?
        isAuthenticated: function () {
            return !!service.currentUser;
        }
    };

    return service;
});