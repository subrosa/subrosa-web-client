/**
 * @ngdoc filter
 * @name  subrosa.game:gameField
 *
 * @requires i18n
 *
 * @description
 *   A filter to return the translated game field string and description.
 *
 * @example
 *   {{ 'HOME_ADDRESS' | gameField }} will produce the translated string "Home Address".
 */
angular.module('subrosa.game').filter('gameField', function (i18n) {
    const GAME_FIELDS = {
        USERNAME: i18n('Code Name'),
        NAME: i18n('Full Name'),
        GENDER: i18n('Gender'),
        DOB: i18n('Date of Birth'),
        EMAIL_ADDRESS: i18n('Email Address'),
        CELL_PHONE: i18n('Cell Phone'),
        HOME_ADDRESS: i18n('Home Address'),
        WORK_ADDRESS: i18n('Work Address'),
        SCHOOL_ADDRESS: i18n('School Address'),
        PHOTO_ID: i18n('Photo Id'),
        ACTION_PHOTO: i18n('Action Photo')
    };

    return function (input) {
        var gameField = input;
        if (GAME_FIELDS.hasOwnProperty(input)) {
            gameField = GAME_FIELDS[input];
        }
        return gameField;
    };
});
