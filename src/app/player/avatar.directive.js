/**
 * @ngdoc directive
 * @name subrosa.player
 *
 * @description
 *   Include an avatar for a player.
 *
 * @example
 *   <div avatar="account"></div>
 */
angular.module('subrosa.player').directive('avatar', function () {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: '/app/player/views/avatar.html',
        scope: {
            player: '=avatar',
            size: '@',
            editable: '=',
            showUsername: '='
        }
    };
});
