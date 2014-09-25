/**
 * @ngdoc filter
 * @name  subrosa.account:accountDisplayName
 *
 * @requires i18n
 *
 * @description
 *   A filter to return the username, name or email of an account.
 *
 * @example
 *   {{ account | accountDisplayName }}
 */
angular.module('subrosa.account').filter('accountDisplayName', function (i18n) {
    return function (account) {
        var displayName = i18n("Whomever you are");
        if (account) {
            displayName = account.username || account.name ||
                account.email || displayName;
        }
        return displayName;
    };
});
