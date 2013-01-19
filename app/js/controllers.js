'use strict';

/*
 * Initializing controller for all Game related controllers.
 * Set up the objects to be used across controllers.
 */
function GameInitController($scope, $routeParams, Game) {
    // This must be done when the route changes.
    $scope.$on('$routeChangeSuccess', function (event, routeData) {
        // Get the game, set the page title, and redirect to the game feed.
        Game.get({gameId: $routeParams.gameId}, function (game) {
            $scope.game = game;
            $scope.title = game.name;
        });
    });
}
GameInitController.$inject = ['$scope', '$routeParams', 'Game'];

/*
 * Display the game rules.
 */
function RulesController($scope) {
    $scope.title = "Rules for " + $scope.game.name;
    $scope.rules = $scope.game.rules;
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

