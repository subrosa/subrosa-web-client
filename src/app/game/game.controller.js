/**
 * @ngdoc controller
 * @name subrosa.game.GameController
 *
 * @requires $scope
 * @requires game
 *
 * @description
 *  Parent controller for game related functionality.
 *  Loads the game and sets up common game related functionality.
 */
angular.module('subrosa.game').controller('GameController', function ($scope, game) {
    var success, error;

    success = function () {
        $scope.saving = false;
    };

    error = function (response) {
        $scope.saving = false;
        $scope.go('game.edit');
        $scope.notifications = response.data.notifications;
    };

    $scope.game = game.get({url: $scope.$stateParams.gameUrl});

    $scope.publishGame = function () {
        $scope.saving = false;
        $scope.game.$publish(success, error);
    };
});
