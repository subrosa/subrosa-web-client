/**
 * @ngdoc filter
 * @name  subrosa.game:gameStatus
 *
 * @description
 *   A filter to return the translated game status string.
 *
 * @example
 *   {{ 'DRAFT' | gameStatus }} will produce the translated string "Draft".
 */
angular.module('subrosa.game').filter('gameStatus', function (gettext) {
    var GAME_STATUS = {
        DRAFT: gettext('Draft'),
        PREREGISTRATION: gettext('Registration beginning soon'),
        REGISTRATION: gettext('Accepting players'),
        POSTREGISTRATION: gettext('Game about to begin'),
        RUNNING: gettext('In progress'),
        ARCHIVED: gettext('Game over man')
    };

    return function (input) {
        var gameStatus = input;
        if (GAME_STATUS.hasOwnProperty(input)) {
            gameStatus = GAME_STATUS[input];
        }
        return gameStatus;
    };
});