/**
 * @ngdoc controller
 * @name subrosa.game.GameController
 *
 * @requires $scope
 * @requires $state
 * @requires Game
 *
 * @description
 *  Parent controller for game related functionality.
 *  Loads the game and sets up common game related functionality.
 */
angular.module('subrosa.game').controller('GameController', function ($scope, $state, Game) {
    var publishSuccess, publishError;

    publishSuccess = function () {
        $scope.saving = false;
    };

    publishError = function (response) {
        $scope.saving = false;
        $scope.go('game.edit');
        $scope.notifications = response.data.notifications;
    };

    $scope.game = Game.get({url: $scope.$stateParams.gameUrl});

    $scope.joinGame = function () {
        if ($scope.game.requiresPassword) {
            // @TODO
            $state.go('game.enroll.enter-password');
        }
        $state.go('game.enroll');
    };

    $scope.publishGame = function () {
        $scope.saving = false;
        $scope.game.$publish(publishSuccess, publishError);
    };
});
