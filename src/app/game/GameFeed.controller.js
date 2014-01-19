/**
 * @ngdoc controller
 * @name subrosa.game.GameFeedController
 *
 * @requires $scope
 * @requires GameFeed
 *
 * @description
 *  Controller for game dashboard related functionality.
 */
angular.module('subrosa.game').controller('GameFeedController', function ($scope, GameFeed) {
    $scope.offset = 0;
    $scope.limit = 20;
    $scope.posts = GameFeed.get({
        gameUrl: $scope.$stateParams.gameUrl,
        offset: $scope.offset,
        limit: $scope.limit
    });
});