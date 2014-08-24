/**
 * @ngdoc factory
 * @name subrosa.notifications.errorDictionary
 *
 * @requires i18n
 *
 * @description
 *  A key value store of error codes and their translated messages.
 *
 */
angular.module('subrosa.notifications').service('errorDictionary', function (i18n) {
    var NOTIFICATION_DICTIONARY = {
            UNKNOWN: i18n('Oops, something went wrong'),
            NOT_FOUND: i18n("Not found"),
            FORBIDDEN: i18n("Forbidden"),
            NOT_ACCEPTABLE: i18n("Media type in Accept header not supported"),
            UNAUTHORIZED_FIELD_ACCESS: i18n("Unauthorized field access"),
            MISSING_REQUIRED_FIELD: i18n("Missing required field: %s"),
            INVALID_FIELD_VALUE: i18n("Invalid value for field: %s"),
            READ_ONLY_FIELD: i18n("Cannot update this field: %s"),
            INVALID_REQUEST_ENTITY: i18n("Invalid request entity"),
            INTERNAL_ERROR: i18n("Internal error"),
            DOMAIN_OBJECT_NOT_FOUND: i18n("Domain object not found"),
            DESERIALIZATION_ERROR: i18n("Error deserializing request"),
            FILE_CORRUPT: i18n("File is corrupt"),
            FILE_TOO_LARGE: i18n("File is too large"),
            FILE_NOT_FOUND: i18n("File not found")
        },
        FIELD_DICTIONARY = {
            unknown: i18n('This field is in error'),
            invalidValue: i18n('This value is invalid')
        };

    this.unknownError = NOTIFICATION_DICTIONARY.UNKNOWN;

    this.transform = function (notification) {
        var code = notification.code,
            fieldCode = null,
            errorMessage = NOTIFICATION_DICTIONARY.UNKNOWN,
            fieldErrorMessage = FIELD_DICTIONARY.unknown;

        if (NOTIFICATION_DICTIONARY.hasOwnProperty(code)) {
            errorMessage = NOTIFICATION_DICTIONARY[code];
        }

        if (notification.details && notification.details.hasOwnProperty('field')) {
            errorMessage = errorMessage.replace('%s', notification.details.field);

            fieldCode = notification.details.code;
            if (FIELD_DICTIONARY.hasOwnProperty(fieldCode)) {
                fieldErrorMessage = FIELD_DICTIONARY[fieldCode];
            }

            notification.details.message = fieldErrorMessage;
        }

        notification.message = errorMessage;
        return notification;
    };

});
