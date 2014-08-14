/**
 * @ngdoc controller
 * @name subrosa.game.EditGameEventsController
 *
 * @requires $scope
 * @requires gettext
 * @requires modalCache
 * @requires timelineCache
 * @requires GameEvent
 *
 * @description
 *  Handles the editing of game events.
 */
angular.module('subrosa.game').controller('EditGameEventsController', function ($scope, gettext, modalCache, timelineCache, GameEvent) {
    const ONE_HOUR = 3600000, ONE_WEEK = 604800000, ONE_YEAR = 31556952000, NOW = new Date().getTime();

    var saveEvent = function () {
        var success, error, gameEvent;

        gameEvent = timelineCache.get('editGameEvents').getModel($scope.events);

        success = function (response) {
            gameEvent.id = response.id;
        };

        error = function (response) {
            $scope.notifications = response.data.notifications;
        };

        gameEvent.$save({gameUrl: $scope.$stateParams.gameUrl, id: gameEvent.id},
            success, error);
    };

    $scope.events = [];
    $scope.notifications = [];

    $scope.game.$promise.then(function (game) {
        var registrationStart, registrationEnd, gameStart, gameEnd, editable;

        // Registration and game duration defaults
        gameStart = game.gameStart || NOW + (ONE_WEEK * 2);
        gameEnd = game.gameEnd || gameStart + (ONE_WEEK * 3);
        registrationStart = game.registrationStart || NOW;
        registrationEnd = game.registrationEnd || gameStart - ONE_HOUR;
        editable = game.isDraft();

        $scope.options = {
            eventMargin: 10,  // minimal margin between events
            minHeight: 200,
            zoomMax: ONE_YEAR,
            zoomMin: ONE_HOUR
        };

        GameEvent.query({gameUrl: $scope.$stateParams.gameUrl}, function (response) {
            $scope.events = response.results;
        });

        // Add registration period and game duration
        $scope.events.push(new GameEvent({id: 1, start: registrationStart, end: registrationEnd, content: "Registration Period", editable: editable}));
        $scope.events.push(new GameEvent({start: gameStart, end: gameEnd, content: game.name, editable: editable}));
    });

    $scope.eventAdded = function (selection) {
        var removeFromTimeline = function () {
            var timeline = timelineCache.get('editGameEvents');
            timeline.deleteItem(timeline.getIndex(selection));
        };

        $scope.event = selection;
        modalCache.openModal('gameEventModal', $scope).result.then(saveEvent,
            removeFromTimeline);
    };

    $scope.eventChanged = function (selection) {
        saveEvent(selection);
    };

    $scope.eventDeleted = function (selection) {
        selection.$delete({gameUrl: $scope.$stateParams.gameUrl, id: selection.id});
    };

    $scope.eventEdited = function (selection) {
        if (selection.editable === true) {
            $scope.event = selection;
            modalCache.openModal('gameEventModal', $scope).result.then(saveEvent);
        }
    };
});