/**
 * @ngdoc controller
 * @name subrosa.game.EditGameEventsController
 *
 * @requires $scope
 * @requires gettext
 * @requires modalCache
 * @requires timelineCache
 * @requires gameEvent
 *
 * @description
 *  Handles the editing of game events.
 */
angular.module('subrosa.game').controller('EditGameEventsController', function ($scope, gettext, modalCache, timelineCache, gameEvent) {
    const ONE_HOUR = 3600000, ONE_YEAR = 31556952000;

    var saveEvent = function () {
        var success, error, event;

        event = timelineCache.get('editGameEvents').getModel($scope.events);

        success = function (response) {
            event.id = response.id;
        };

        error = function (response) {
            $scope.notifications = response.data.notifications;
        };

        event.$save({gameUrl: $scope.$stateParams.gameUrl, id: event.id},
            success, error);
    };

    $scope.events = [];
    $scope.notifications = [];
    // TODO: get valid event types from server
    $scope.eventTypes = [
        {id: 'REGISTRATION', name: 'Registration Period'}
    ];

    $scope.game.$promise.then(function (game) {
        $scope.editable = game.isDraft();

        $scope.options = {
            eventMargin: 10,  // minimal margin between events
            minHeight: 200,
            zoomMax: ONE_YEAR,
            zoomMin: ONE_HOUR
        };

        gameEvent.query({gameUrl: game.url}, function (response) {
            $scope.events = response.results;
        });
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
