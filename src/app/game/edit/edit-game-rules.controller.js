/**
 * @ngdoc controller
 * @name subrosa.game.EditGameRulesController
 *
 * @requires $scope
 *
 * @description
 *  Handles the editing of game options.
 */
angular.module('subrosa.game').controller('EditGameRulesController', function ($scope) {
    'use strict';

    $scope.adding = false;
    $scope.saving = false;

    $scope.saveGame = function () {
        var success, error;

        success = function () {
            $scope.saving = false;
        };

        error = function (response) {
            $scope.saving = false;
            $scope.gameOptionNotifications = response.data.notifications;
        };

        $scope.saving = true;
        $scope.game.$update(success, error);
    };
});
