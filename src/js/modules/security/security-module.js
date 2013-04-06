/*global angular*/
'use strict';

var securityModule = angular.module('security', ['security.auth', 'security.form', 'security.interceptor', 'security.queue']);

// Get the current user when the application starts
// (in case they are still logged in from a previous session)
securityModule.run(function (AuthenticationService) {
    AuthenticationService.getCurrentUser();
});