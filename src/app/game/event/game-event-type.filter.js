/**
 * @ngdoc filter
 * @name  subrosa.game:gameEventType
 *
 * @description
 *   A filter to return the translated game status string.
 *
 * @example
 *   The expression {{ 'REGISTRATION' | gameEventType }} will produce
 *   the translated string "Registration Period".
 */
angular.module('subrosa.game').filter('gameEventType', function (i18n) {
    'use strict';

    var EVENT_TYPE = {
        gameStart: i18n('Game Begins'),
        registrationStart: i18n('Registration Open'),
        registrationEnd: i18n('Registration Closed'),
        gameEnd: i18n('Game Ends')
    };

    return function (input) {
        var eventType = input;
        if (EVENT_TYPE.hasOwnProperty(input)) {
            eventType = EVENT_TYPE[input];
        }
        return eventType;
    };
});
