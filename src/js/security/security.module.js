/*global angular*/
'use strict';

angular.module('security.directives', []);

var securityModule = angular.module('security', [
    'security.auth',
    'security.directives',
    'security.form',
    'security.interceptor',
    'security.queue'
]);

// We have to add the interceptor to the queue as a string because the interceptor depends
// upon service instances that are not available in the config block.
angular.module('security').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.responseInterceptors.push('SecurityInterceptor');
}]);

// Get the current user when the application starts
// (in case they are still logged in from a previous session)
securityModule.run(function (AuthenticationService) {
    AuthenticationService.getCurrentUser();
});
