/**
 * @ngdoc factory
 * @name subrosa.player.Player
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for player(s).
 */
angular.module('subrosa.player').factory('Player', function ($resource) {
    return $resource('/subrosa/v1/account/:accountId/player/:id', {accountId: '@accountId', id: '@id'}, {
        query: {method: 'GET', isArray: false}
    });
});
