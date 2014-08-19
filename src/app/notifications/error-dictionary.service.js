/**
 * @ngdoc factory
 * @name subrosa.notifications.ErrorDictionary
 *
 * @requires gettext
 *
 * @description
 *  A key value store of error codes and their translated messages.
 *
 */
angular.module('subrosa.notifications').service('ErrorDictionary', function (gettext) {
    var NOTIFICATION_DICTIONARY = {
            UNKNOWN: gettext('Oops, something went wrong'),
            NOT_FOUND: gettext("Not found"),
            FORBIDDEN: gettext("Forbidden"),
            NOT_ACCEPTABLE: gettext("Media type in Accept header not supported"),
            UNAUTHORIZED_FIELD_ACCESS: gettext("Unauthorized field access"),
            MISSING_REQUIRED_FIELD: gettext("Missing required field: %s"),
            INVALID_FIELD_VALUE: gettext("Invalid value for field: %s"),
            READ_ONLY_FIELD: gettext("Cannot update this field: %s"),
            INVALID_REQUEST_ENTITY: gettext("Invalid request entity"),
            INTERNAL_ERROR: gettext("Internal error"),
            DOMAIN_OBJECT_NOT_FOUND: gettext("Domain object not found"),
            DESERIALIZATION_ERROR: gettext("Error deserializing request"),
            FILE_CORRUPT: gettext("File is corrupt"),
            FILE_TOO_LARGE: gettext("File is too large"),
            FILE_NOT_FOUND: gettext("File not found")
        },
        FIELD_DICTIONARY = {
            unknown: gettext('This field is in error'),
            invalidValue: gettext('This value is invalid')
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