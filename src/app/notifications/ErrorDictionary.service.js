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
            unknown: gettext('Oops, something went wrong'),
            notFound: gettext("Not found"),
            forbidden: gettext("Forbidden"),
            notAcceptable: gettext("Media type in Accept header not supported"),
            unauthorizedFieldAccess: gettext("Unauthorized field access"),
            missingRequiredField: gettext("Missing required field: %s"),
            invalidValue: gettext("Invalid value for field: %s"),
            readOnly: gettext("Cannot update this field: %s"),
            invalidRequestEntity: gettext("Invalid request entity"),
            internalError: gettext("Internal error"),
            objectNotFound: gettext("Domain object not found"),
            requestCorrupt: gettext("Error deserializing request"),
            fileCorrupt: gettext("File is corrupt"),
            fileTooLarge: gettext("File is too large"),
            fileNotFound: gettext("File not found")
        },
        FIELD_DICTIONARY = {
            unknown: gettext('This field is in error'),
            invalidValue: gettext('This value is invalid')
        };

    this.unknownError = NOTIFICATION_DICTIONARY.unknown;

    this.transform = function (notification) {
        var code = notification.code,
            fieldCode = null,
            errorMessage = NOTIFICATION_DICTIONARY.unknown,
            fieldErrorMessage = FIELD_DICTIONARY.unknown;

        if (NOTIFICATION_DICTIONARY.hasOwnProperty(code)) {
            errorMessage = NOTIFICATION_DICTIONARY[code];
        }

        if (notification.hasOwnProperty('details') && notification.details.hasOwnProperty('field')) {
            errorMessage = errorMessage.replace('%s', notification.details.field);

            fieldCode = notification.details.code;
            if (NOTIFICATION_DICTIONARY.hasOwnProperty(fieldCode)) {
                fieldErrorMessage = FIELD_DICTIONARY[fieldCode];
            }

            notification.details.message = fieldErrorMessage;
        }

        notification.message = errorMessage;
        return notification;
    };

});