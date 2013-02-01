'use strict';

/*
 * Initializing controller for all Game related controllers.
 * Set up the objects to be used across controllers.
 */
function GameInitController($scope, $routeParams, Game) {
    // This must be done when the route changes.
    $scope.$on('$routeChangeSuccess', function (event, routeData) {
        if ($routeParams.gameId) {
            // Look up game by ID if we have it.
            Game.get({gameId: $routeParams.gameId}, function (game) {
                $scope.game = game;
                $scope.title = game.name;
            });
        } else {
            // Otherwise look up the game by name.
            $scope.game = Game.getByName({gameName: $routeParams.gameName});
        }
    });
}

/*
 * Display the game rules.
 */
function RulesController($scope) {
    var blah = $scope.$parent;
    $scope.$parent.title = "Rules for " + $scope.game.name;
    $scope.rules = $scope.$parent.game.rules;
}
RulesController.$inject = ['$scope'];

/*
 * Display the game feed.
 */
function FeedController($scope) {
    $scope.title = "Game Feed for " + $scope.game.name;
    $scope.rules = $scope.game.rules;
}
FeedController.$inject = ['$scope'];

