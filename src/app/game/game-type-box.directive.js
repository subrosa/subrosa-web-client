/**
 * @ngdoc directive
 * @name subrosa.game:gameTypeBox
 *
 * @description
 *  Display a game box for the given game type.
 */
angular.module('subrosa.game').directive('gameTypeBox', function () {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: '/app/game/views/game-type-box.html',
        scope: {
            gameType: '=gameTypeBox'
        }
    };
});

