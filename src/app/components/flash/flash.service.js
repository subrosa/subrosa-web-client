/**
 * @ngdoc service
 * @name subrosa.components.flash.flash
 *
 * @requires $rootScope
 *
 * @description
 *  Service for creating and retrieving flash messages.
 */
angular.module('subrosa.components.flash').service('flash', function ($rootScope) {
    $rootScope.flashMessages = [];

    /**
     * Add a flash message to the list of messages.
     *
     * @param {string} type the type of the flash message.
     * @param {string} message the message to display
     */
    this.add = function (type, message) {
        $rootScope.flashMessages.push({type: type, message: message});
    };
});
