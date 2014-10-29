/**
 * @ngdoc controller
 * @name subrosa.game.EditGameEventsController
 *
 * @requires $scope
 * @requires _
 * @requires i18n
 * @requires GameEvent
 *
 * @description
 *  Handles the editing of game events.
 */
angular.module('subrosa.game').controller('EditGameEventsController', function ($scope, _, i18n, GameEvent) {
    $scope.events = [];
    $scope.notifications = [];

    // TODO: get valid event types from server
    $scope.eventTypes = [
        {id: 'registrationStart', name: 'Registration Start'},
        {id: 'registrationEnd', name: 'Registration End'}
    ];

    $scope.game.$promise.then(function (game) {
        GameEvent.query({gameUrl: game.url}, function (response) {
            $scope.events = response.results;
        });
    });

    $scope.event = new GameEvent();

    $scope.addEvent = function (event) {
        event.gameUrl = $scope.game.url;
        $scope.events.push(event);
    };

    $scope.editEvent = function (event) {
        $scope.event = event;
    };

    $scope.saveEvent = function (event) {
        var success, error;

        success = function () {
            $scope.saving = false;
            $scope.saveEventNotifications = [{type: 'success', message: i18n('Event Saved.')}];
            $scope.event = {};
            $scope.saveEventForm.$setPristine();
        };

        error = function (response) {
            $scope.saving = false;
            $scope.saveEventNotifications = response.data.notifications;
        };

        $scope.saving = true;
        event.$save(success, error);
    };

    $scope.removeEvent = function (event) {
        var success, error, events = angular.copy($scope.events);

        $scope.events = _.filter($scope.events, function (info) {
            return info !== event;
        });

        success = function () {
            $scope.eventNotifications = [{type: 'success', message: i18n('Event Removed.')}];
        };

        error = function (response) {
            $scope.eventNotifications = response.data.notifications;
            $scope.events = events;
        };

        event.$delete(success, error);
    };
});
