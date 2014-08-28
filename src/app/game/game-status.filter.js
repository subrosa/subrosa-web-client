/**
 * @ngdoc filter
 * @name  subrosa.game:gameStatus
 *
 * @requires i18n
 *
 * @description
 *   A filter to return the translated game status string.
 *
 * @example
 *   {{ 'DRAFT' | gameStatus }} will produce the translated string "Draft".
 */
angular.module('subrosa.game').filter('gameStatus', function (i18n) {
    var GAME_STATUS = {
        DRAFT: i18n('Draft'),
        PREREGISTRATION: i18n('Registration beginning soon'),
        REGISTRATION: i18n('Accepting players'),
        POSTREGISTRATION: i18n('Game about to begin'),
        RUNNING: i18n('In progress'),
        ARCHIVED: i18n('Archived')
    };

    return function (input) {
        var gameStatus = input;
        if (GAME_STATUS.hasOwnProperty(input)) {
            gameStatus = GAME_STATUS[input];
        }
        return gameStatus;
    };
});
