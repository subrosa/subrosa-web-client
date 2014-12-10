/**
 * @ngdoc controller
 * @name subrosa.game.GameEnrollmentController
 *
 * @requires $scope
 * @requires $state
 * @requires _
 * @requires authService
 * @requires Account
 * @requires Player
 * @requires GamePlayer
 *
 * @description
 *  Controller for enrolling users into a game.
 */
angular.module('subrosa.game').controller('GameEnrollmentController',
function ($scope, $state, _, authService, Account, Player, GamePlayer) {
    $scope.setPlayer = function (player) {
        $scope.player = player;
        $state.go('game.enroll.join');
    };

    $scope.joinGame = function (form) {
        var success, error,
            requiredFields = _.pluck($scope.game.playerInfo, 'fieldId');

        success = function () {
            $scope.joining = false;
            $state.go('game');
        };

        error = function (response) {
            $scope.joining = false;
            $scope.joinGameNotifications = response.data.notifications;
        };

        angular.forEach(form, function (value, key) {
            if (_.contains(requiredFields, key)) {
                $scope.player[key] = value.$viewValue;
            }
        });

        $scope.joining = true;
        GamePlayer.save({url: $scope.game.url}, $scope.player, success, error);
    };

    $scope.account = authService.getCurrentUser(function () {
        Player.query(function (response) {
            $scope.players = response.results;
        });
    });
});
