/**
 * @ngdoc controller
 * @name subrosa.game.CreateGameController
 *
 * @requires $scope
 * @requires Game
 * @requires GameType
 *
 * @description
 *  Controller for creating a new game.
 */
angular.module('subrosa.game').controller('CreateGameController', function ($scope, Game, GameType) {
    $scope.createGameNotifications = [];
    $scope.game = new Game();
    $scope.gameTypes = GameType.query();

    // TODO: remove me once API is available
    $scope.gameTypes = {results: [
        {id: 1, name: 'ASSASSIN', icon: 'fa-bullseye', description: 'Find and eliminate your target before they find you.', image: {}},
        {id: 2, name: 'SCAVENGER', icon: 'fa-map-marker', description: 'Define goals for your players and use GPS checkpoints for location-based challenges.', image: {}}
    ]};

    $scope.setGameType = function (type) {
        $scope.game.gameType = type;
    };

    $scope.createGame = function () {
        var success, error;

        success = function (game) {
            $scope.go('game.edit', {gameUrl: game.url});
        };

        error = function (response) {
            $scope.createGameNotifications = response.data.notifications;
        };

        $scope.game.gameType = $scope.game.gameType.name;
        $scope.game.$save(success, error);
    };
});
