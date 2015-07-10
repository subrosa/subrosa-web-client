/**
 * @ngdoc directive
 * @name subrosa.game.eventTypeIcon
 *
 * @description
 *   Provides an icon based on event type.
 */
angular.module('subrosa.game').directive('gameEventTypeIcon', function () {
   'use strict';

    var EVENT_TYPE = {
        gameStart: 'fa-rocket',
        registrationStart: 'fa-cc-visa',
        registrationEnd: 'fa-lock',
        gameEnd: 'fa-stop'
    };

    return {
        restrict: 'AE',
        templateUrl: '/app/game/event/views/game-event-type-icon.html',
        scope: {
            event: '=gameEventTypeIcon'
        },
        link: function (scope) {
            var type = scope.event.event || null;

            if (EVENT_TYPE.hasOwnProperty(type)) {
                scope.className = EVENT_TYPE[type];
            } else {
                scope.className = 'fa-cubes';
            }
        }
    };
});
