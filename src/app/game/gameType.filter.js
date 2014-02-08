/**
 * @ngdoc filter
 * @name  subrosa.game:gameType
 *
 * @description
 *   A filter to return the translated game type string.
 *
 * @example
 *   {{ 'ASSASSIN' | gameType }} will produce the translated string "Assassins".
 */
angular.module('subrosa.game').filter('gameType', function (gettext) {
    var GAME_TYPES = {
        ASSASSIN: gettext('Assassins')
    };

    return function (input) {
        var gameType = input;
        if (GAME_TYPES.hasOwnProperty(input)) {
            gameType = GAME_TYPES[input];
        }
        return gameType;
    };
});