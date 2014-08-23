/**
 * @ngdoc factory
 * @name subrosa.game.gameEvent
 *
 * @requires $resource
 * @requires eventTypeFilter
 *
 * @description
 *  Provides a $resource for game event(s).
 */
angular.module('subrosa.game').factory('gameEvent', function ($resource, eventTypeFilter) {
    return $resource('/subrosa/v1/game/:gameUrl/event/:id', {gameUrl: '@gameUrl', id: '@id'}, {
        query: {isArray: false, transformResponse: function (data) {
            var response = angular.fromJson(data);

            if (response.hasOwnProperty('results')) {
                angular.forEach(response.results, function (event) {
                    event.content = eventTypeFilter(event.eventType);
                });
            }

            return response;
        }},
        update: {method: 'PUT'}
    });
});
