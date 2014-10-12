/**
 * @ngdoc directive
 * @name subrosa.image
 *
 * @description
 *   Include an avatar for an account.
 *
 * @example
 *   <div avatar="account"></div>
 */
angular.module('subrosa.components.image').directive('avatar', function () {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: '/app/components/image/views/avatar.html',
        scope: {
            account: '=avatar',
            size: '@',
            editable: '='
        }
    };
});
