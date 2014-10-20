/**
 * @ngdoc factory
 * @name subrosa.game.Team
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for team(s).
 */
angular.module('subrosa.game').factory('Team', function ($resource) {
    return $resource('/subrosa/v1/game/:url/team/:id', {url: '@url', id: '@id'}, {
        query: {method: 'GET', isArray: false}
    });
});
