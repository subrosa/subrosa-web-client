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
    const NOTIFICATION_DICTIONARY = {
        unknown: i18n('Oh fiddlesticks! Something went wrong'),
        notFound: i18n("Not found"),
        forbidden: i18n("Forbidden"),
        badRequest: i18n("Your request is malformed"),
        notAcceptable: i18n("Media type in Accept header not supported"),
        unauthorizedFieldAccess: i18n("Unauthorized field access"),
        missingRequiredField: i18n("Missing required field"),
        invalidValue: i18n("Double check the values below and try again"),
        readOnly: i18n("Cannot update this field"),
        invalidRequestEntity: i18n("The request body is missing or of the wrong type"),
        internalError: i18n("Internal error"),
        objectNotFound: i18n("Domain object not found"),
        requestCorrupt: i18n("Your request is corrupt"),
        fileCorrupt: i18n("File is corrupt"),
        fileTooLarge: i18n("File is too large"),
        fileNotFound: i18n("File not found")
    };

    this.unknownError = NOTIFICATION_DICTIONARY.unknown;

    this.translate = function (notification) {
        var code = notification.code,
            errorMessage = NOTIFICATION_DICTIONARY.unknown;

        if (NOTIFICATION_DICTIONARY.hasOwnProperty(code)) {
            errorMessage = NOTIFICATION_DICTIONARY[code];
        }

        notification.message = errorMessage;
        return notification;
    };
});
