/**
 * @ngdoc controller
 * @name subrosa.game.EditGameEventsController
 *
 * @requires $scope
 * @requires gettext
 * @requires timelineCache
 * @requires GameEvent
 *
 * @description
 *  Handles the editing of game events.
 */
angular.module('subrosa.game').controller('EditGameEventsController', function ($scope, gettext, modalCache, timelineCache, GameEvent) {
    var saveEvent;

    $scope.events = [];

    $scope.game.$promise.then(function (game) {
        var oneDay = 86400000,
            oneHour = 3600000,
            max = game.gameEnd + oneDay,
            min = game.registrationStart || game.gameStart - oneDay;

        $scope.options = {
            eventMargin: 10,  // minimal margin between events
            min: min,
            max: max,
            zoomMax: max - min,
            zoomMin: oneHour
        };

        GameEvent.query({gameUrl: $scope.$stateParams.gameUrl}, function (response) {
            $scope.events = response.results;
        });
    });

    saveEvent = function () {
        var success, error, gameEvent;

        gameEvent = timelineCache.get('editGameEvents').getModel($scope.data);

        success = function (response) {
            gameEvent.id = response.id;
        };

        error = function (response) {
            $scope.notifications = response.data.notifications;
        };

        gameEvent.$save({gameUrl: $scope.$stateParams.gameUrl, id: gameEvent.id},
            success, error);
    };

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
        selection.$delete();
    };

    $scope.eventEdited = function (selection) {
        if (selection.editable === true) {
            $scope.event = selection;
            modalCache.openModal('gameEventModal', $scope).result.then(saveEvent);
        }
    };
});