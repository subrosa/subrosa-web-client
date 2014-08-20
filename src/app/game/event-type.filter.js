/**
 * @ngdoc filter
 * @name  subrosa.game:eventType
 *
 * @description
 *   A filter to return the translated game status string.
 *
 * @example
 *   The expression {{ 'REGISTRATION' | eventType }} will produce
 *   the translated string "Registration Period".
 */
angular.module('subrosa.game').filter('eventType', function (gettext) {
    var EVENT_TYPE = {
        REGISTRATION: gettext('Registration Period')
    };

    return function (input) {
        var eventType = input;
        if (EVENT_TYPE.hasOwnProperty(input)) {
            eventType = EVENT_TYPE[input];
        }
        return eventType;
    };
});
