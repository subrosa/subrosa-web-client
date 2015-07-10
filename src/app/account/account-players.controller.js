/**
 * @ngdoc controller
 * @name subrosa.account.AccountPlayersController
 *
 * @requires $scope
 * @requires Player
 *
 * @description
 *  Controller for managing Players within an Account.
 */
angular.module('subrosa.account').controller('AccountPlayersController', function ($scope, Player) {
    'use strict';

    var success, error;

    $scope.accountPlayerNotifications = [];

    success = function () {
        $scope.saving = false;
    };

    error = function (response) {
        $scope.saving = false;
        $scope.accountPlayerNotifications = response.data.notifications;
    };

    $scope.setPlayer = function (player) {
        $scope.account.currentPlayerId = player.id;
        $scope.account.$update(success, error);
    };

    Player.query(function (response) {
        $scope.players = response.results;
    });
});
