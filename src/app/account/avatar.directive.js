/**
 * @ngdoc directive
 * @name subrosa.account
 *
 * @description
 *   Include an avatar for an account.
 *
 * @example
 *   <div avatar="account"></div>
 */
angular.module('subrosa.account').directive('avatar', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/account/views/avatar.html',
        scope: {
            account: '=avatar',
            size: '@'
        }
    };
});
