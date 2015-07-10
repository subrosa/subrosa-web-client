/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  HTTP Auth Interceptor Module for AngularJS
 *  Copyright (c) 2013 Gabriele Destefanis
 *  License: MIT
 *
 *  https://github.com/destegabry/angular-timeline
 */

/**
 * @ngdoc directive
 * @name subrosa.components:timeline:timeline
 *
 * @description
 *   Provides a timeline for game events.
 *
 * @example
 *   <div game-event-timeline="events"></div>
 */
angular.module('subrosa.game').directive('gameEventTimeline', function () {
    'use strict';
    return {
        restrict: 'AE',
        templateUrl: '/app/game/event/views/game-event-timeline.html',
        scope: {
            events: '=gameEventTimeline'
        }
    };
});
