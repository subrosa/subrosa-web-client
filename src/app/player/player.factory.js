/**
 * @ngdoc factory
 * @name subrosa.player.Player
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for player(s).
 */
angular.module('subrosa.player').factory('Player', function ($resource, API_CONFIG) {
    return $resource(API_CONFIG.URL + '/user/player/:id', {id: '@id'}, {
        query: {method: 'GET', isArray: false}
    });
});
