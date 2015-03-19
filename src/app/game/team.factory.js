/**
 * @ngdoc factory
 * @name subrosa.game.Team
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for team(s).
 */
angular.module('subrosa.game').factory('Team', function ($resource, API_CONFIG) {
    return $resource(API_CONFIG.URL + '/game/:url/team/:id', {url: '@url', id: '@id'}, {
        query: {method: 'GET', isArray: false}
    });
});
