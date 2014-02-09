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
    var DICTIONARY = {
        UNKNOWN: {message: gettext('Oops, something went wrong.'), type: 'danger'},
        1000000001: {message: gettext("Not found"), type: 'danger'},
        1000000002: {message: gettext("Forbidden"), type: 'danger'},
        1000000003: {message: gettext("Media type in Accept header not supported"), type: 'danger'},
        1000000004: {message: gettext("Unauthorized field access"), type: 'danger'},
        1000010001: {message: gettext("Missing required field"), type: 'danger'},
        1000010002: {message: gettext("Invalid value for field"), type: 'danger'},
        1000010004: {message: gettext("Invalid length for field"), type: 'danger'},
        1000010005: {message: gettext("Invalid format for field"), type: 'danger'},
        1000010006: {message: gettext("Invalid characters in field"), type: 'danger'},
        1000010007: {message: gettext("Cannot set read-only field"), type: 'danger'},
        1000010008: {message: gettext("Invalid request entity"), type: 'danger'},
        1000020001: {message: gettext("Internal error"), type: 'danger'},
        1000020002: {message: gettext("Domain object not found"), type: 'danger'},
        1000020003: {message: gettext("Error deserializing request"), type: 'danger'},
        1000020004: {message: gettext("File is corrupt"), type: 'danger'},
        1000020005: {message: gettext("File is too large"), type: 'danger'},
        1000020006: {message: gettext("File is encrypted"), type: 'danger'},
        1000020007: {message: gettext("File not found"), type: 'danger'}
    };

    this.transform = function (notification) {
        var code = notification.code;
        if (DICTIONARY.hasOwnProperty(code)) {
            var error = DICTIONARY[code];
            notification.message = error.message;
            notification.type = error.type;
            return notification;
        } else {
            throw new Error("Unrecognized error code passed to ErrorDictionary");
        }
    };

    this.unknownError = DICTIONARY.UNKNOWN;

});