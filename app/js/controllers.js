'use strict';

/*
 * Initializing controller for all Game related controllers.
 * Set up the $scope to be used across controllers.
 */
function GameInitController($rootScope, $routeParams, Game) {
    /*
     * Gets the Game from either the $rootScope (if present) or the API.
     * @param callback a function to call once the game has been retrieved.
     */
    $rootScope.getGame = function (callback) {
        if ($routeParams.gameId && !$rootScope.game) {
            Game.get({gameId: $routeParams.gameId}, function (game) {
                $rootScope.game = game;
                $rootScope.title = game.name;
            });
        }

        // Watch for the game to be populated if we have a callback to execute.
        if (callback && typeof callback === 'function') {
            $rootScope.$watch('game', function (game) {
                if (game) {
                    callback.apply(this, arguments);
                }
            });
        }
    };

    /*
     * Provide a method to set the title of the page.
     * @param title the text to set.
     */
    $rootScope.setTitle = function (title) {
        $rootScope.title = title;
    };

    // Trigger game load
    $rootScope.getGame();
}
GameInitController.$inject = ['$rootScope', '$routeParams', 'Game'];

/*
 * Display the game rules.
 */
function RulesController($scope) {
    $scope.getGame(function (game) {
        $scope.setTitle("Rules for " + game.name);
    });
}
RulesController.$inject = ['$scope'];

/*
 * Display the game feed.
 */
function FeedController($scope) {
    $scope.getGame(function (game) {
        $scope.setTitle("Game Feed for " + game.name);
    });
}
FeedController.$inject = ['$scope'];

