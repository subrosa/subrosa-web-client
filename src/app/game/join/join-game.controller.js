/**
 * @ngdoc controller
 * @name subrosa.game.JoinGameController
 *
 * @requires $scope
 * @requires $state
 * @requires Player
 * @requires Address
 * @requires Image
 *
 * @description
 *  Base controller for join game flow.
 */
angular.module('subrosa.game').controller('JoinGameController', function ($scope, $state, Player, Address, Image) {
    var setDefaults = function () {
        $scope.user = $scope.currentUser || {};
        $scope.player = {};
        $scope.players = [];
        $scope.addresses = [];
        $scope.images = [];
    };

    setDefaults();

    $scope.joinGameNotifications = [];

    $scope.$watch('currentUser', function (user)  {
        if (user) {
            // Gather sub objects if user is authenticated.
            Address.query(function (response) {
                $scope.addresses = response.results;
            });

            Image.query(function (response) {
                $scope.images = response.results;
            });

            Player.query(function (response) {
                // Redirect to player info page if they only have one player
                if (response.results.length === 1) {
                    $scope.player = response.results[0];
                    $state.go('game.join.player-info');
                } else {
                    // Set default player
                    $scope.player = user.player || {};
                }

                $scope.players = response.results;
            });

            $state.go('game.join.select-player');
        } else {
            // Reset the defaults if the user is not authenticated.
            setDefaults();
            $state.go('game.join.register');
        }
    });
});
