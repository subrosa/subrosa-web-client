/**
 * @ngdoc directive
 * @name subrosa.game:gameTypeIcon
 *
 * @description
 *  Display an icon box for the given game type.
 */
angular.module('subrosa.game').directive('gameTypeIcon', function () {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: '/app/game/views/game-type-icon.html',
        scope: {
            gameType: '=gameTypeIcon'
        }
    };
});

